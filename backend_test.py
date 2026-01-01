import requests
import sys
import json
from datetime import datetime

class VendezVotreCarAPITester:
    def __init__(self, base_url="https://rachat-express.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_data": None,
                "error": None
            }

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    result["response_data"] = response.json()
                except:
                    result["response_data"] = response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    result["error"] = error_data
                    print(f"   Error: {error_data}")
                except:
                    result["error"] = response.text
                    print(f"   Error: {response.text}")

            self.test_results.append(result)
            return success, response

        except Exception as e:
            print(f"❌ Failed - Exception: {str(e)}")
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": None,
                "success": False,
                "response_data": None,
                "error": str(e)
            }
            self.test_results.append(result)
            return False, None

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_create_estimation(self):
        """Test creating an estimation"""
        estimation_data = {
            "marque": "Renault",
            "modele": "Clio",
            "annee": "2015",
            "kilometrage": "120000",
            "etat": "roule",
            "carburant": "essence",
            "boite": "manuelle",
            "immatriculation": "1-ABC-123",
            "nom": "Jean Dupont",
            "telephone": "0479123456",
            "email": "jean.dupont@test.com",
            "code_postal": "1000",
            "ville": "Bruxelles",
            "rgpd_consent": True,
            "photos": []
        }
        
        success, response = self.run_test(
            "Create Estimation",
            "POST",
            "estimations",
            200,
            data=estimation_data
        )
        
        if success and response:
            try:
                data = response.json()
                return data.get('id')
            except:
                return None
        return None

    def test_get_estimations(self):
        """Test getting all estimations"""
        return self.run_test("Get All Estimations", "GET", "estimations", 200)

    def test_get_estimation_by_id(self, estimation_id):
        """Test getting estimation by ID"""
        if estimation_id:
            return self.run_test(
                "Get Estimation by ID",
                "GET",
                f"estimations/{estimation_id}",
                200
            )
        else:
            print("⚠️  Skipping Get Estimation by ID - no valid ID available")
            return False, None

    def test_create_contact(self):
        """Test creating a contact message"""
        contact_data = {
            "nom": "Marie Martin",
            "email": "marie.martin@test.com",
            "telephone": "0479654321",
            "message": "Je souhaite avoir plus d'informations sur le rachat de véhicules."
        }
        
        return self.run_test(
            "Create Contact",
            "POST",
            "contact",
            200,
            data=contact_data
        )

    def test_get_contacts(self):
        """Test getting all contact messages"""
        return self.run_test("Get All Contacts", "GET", "contact", 200)

    def test_get_stats(self):
        """Test getting statistics"""
        return self.run_test("Get Stats", "GET", "stats", 200)

    def test_invalid_estimation(self):
        """Test creating estimation without RGPD consent"""
        invalid_data = {
            "marque": "Peugeot",
            "modele": "308",
            "annee": "2018",
            "kilometrage": "80000",
            "etat": "roule",
            "carburant": "diesel",
            "boite": "automatique",
            "nom": "Test User",
            "telephone": "0479999999",
            "email": "test@test.com",
            "code_postal": "4000",
            "ville": "Liège",
            "rgpd_consent": False  # Should fail
        }
        
        return self.run_test(
            "Invalid Estimation (No RGPD)",
            "POST",
            "estimations",
            400,
            data=invalid_data
        )

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting VendezVotreCar API Tests")
        print(f"   Base URL: {self.base_url}")
        print("=" * 50)

        # Test basic connectivity
        self.test_root_endpoint()

        # Test estimation endpoints
        estimation_id = self.test_create_estimation()
        self.test_get_estimations()
        self.test_get_estimation_by_id(estimation_id)
        self.test_invalid_estimation()

        # Test contact endpoints
        self.test_create_contact()
        self.test_get_contacts()

        # Test stats endpoint
        self.test_get_stats()

        # Print summary
        print("\n" + "=" * 50)
        print(f"📊 Test Summary:")
        print(f"   Tests run: {self.tests_run}")
        print(f"   Tests passed: {self.tests_passed}")
        print(f"   Tests failed: {self.tests_run - self.tests_passed}")
        print(f"   Success rate: {(self.tests_passed/self.tests_run)*100:.1f}%")

        return self.tests_passed == self.tests_run

def main():
    tester = VendezVotreCarAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "total_tests": tester.tests_run,
            "passed_tests": tester.tests_passed,
            "success_rate": (tester.tests_passed/tester.tests_run)*100 if tester.tests_run > 0 else 0,
            "results": tester.test_results
        }, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())