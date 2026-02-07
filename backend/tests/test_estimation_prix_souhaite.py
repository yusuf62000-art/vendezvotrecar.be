"""
Test suite for VendezVotreCar - Prix Souhaité Feature
Tests the new optional 'prix_souhaite' field in estimation requests
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestEstimationPrixSouhaite:
    """Tests for the prix_souhaite field in estimations"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup test data"""
        self.test_prefix = f"TEST_{uuid.uuid4().hex[:8]}"
        self.base_estimation_data = {
            "marque": "Renault",
            "modele": f"{self.test_prefix}_Clio",
            "annee": "2020",
            "kilometrage": "50000",
            "etat": "roule",
            "carburant": "essence",
            "boite": "manuelle",
            "nom": f"{self.test_prefix}_Jean Dupont",
            "telephone": "0470123456",
            "email": f"{self.test_prefix}@test.com",
            "code_postal": "1000",
            "ville": "Bruxelles",
            "rgpd_consent": True,
            "photos": []
        }
    
    def test_api_health(self):
        """Test API is accessible"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "VendezVotreCar API"
        print("✓ API health check passed")
    
    def test_create_estimation_with_prix_souhaite(self):
        """Test creating estimation WITH prix_souhaite field"""
        data = self.base_estimation_data.copy()
        data["prix_souhaite"] = "8500"
        data["immatriculation"] = "1-TEST-001"
        
        response = requests.post(f"{BASE_URL}/api/estimations", json=data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        result = response.json()
        assert "id" in result, "Response should contain 'id'"
        assert result["prix_souhaite"] == "8500", f"Expected prix_souhaite='8500', got '{result.get('prix_souhaite')}'"
        assert result["marque"] == "Renault"
        assert result["modele"] == data["modele"]
        
        # Verify persistence with GET
        estimation_id = result["id"]
        get_response = requests.get(f"{BASE_URL}/api/estimations/{estimation_id}")
        assert get_response.status_code == 200
        
        fetched = get_response.json()
        assert fetched["prix_souhaite"] == "8500", "prix_souhaite should persist in database"
        assert fetched["id"] == estimation_id
        
        print(f"✓ Created estimation with prix_souhaite: {estimation_id}")
        return estimation_id
    
    def test_create_estimation_without_prix_souhaite(self):
        """Test creating estimation WITHOUT prix_souhaite field (optional)"""
        data = self.base_estimation_data.copy()
        # Explicitly NOT including prix_souhaite
        
        response = requests.post(f"{BASE_URL}/api/estimations", json=data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        result = response.json()
        assert "id" in result
        # prix_souhaite should be None or not present when not provided
        assert result.get("prix_souhaite") is None or result.get("prix_souhaite") == "", \
            f"prix_souhaite should be None/empty when not provided, got '{result.get('prix_souhaite')}'"
        
        # Verify persistence
        estimation_id = result["id"]
        get_response = requests.get(f"{BASE_URL}/api/estimations/{estimation_id}")
        assert get_response.status_code == 200
        
        fetched = get_response.json()
        assert fetched.get("prix_souhaite") is None or fetched.get("prix_souhaite") == ""
        
        print(f"✓ Created estimation without prix_souhaite: {estimation_id}")
        return estimation_id
    
    def test_create_estimation_with_empty_prix_souhaite(self):
        """Test creating estimation with empty string prix_souhaite"""
        data = self.base_estimation_data.copy()
        data["prix_souhaite"] = ""
        
        response = requests.post(f"{BASE_URL}/api/estimations", json=data)
        
        assert response.status_code == 200
        result = response.json()
        assert "id" in result
        # Empty string should be accepted
        assert result.get("prix_souhaite") == "" or result.get("prix_souhaite") is None
        
        print("✓ Created estimation with empty prix_souhaite")
    
    def test_get_existing_estimation_with_prix_souhaite(self):
        """Test retrieving the pre-created test estimation with prix_souhaite"""
        test_id = "a4a9f19a-505b-4fb7-b717-459af12f5e85"
        
        response = requests.get(f"{BASE_URL}/api/estimations/{test_id}")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data["id"] == test_id
        assert data["prix_souhaite"] == "7500", f"Expected prix_souhaite='7500', got '{data.get('prix_souhaite')}'"
        assert data["marque"] == "Renault"
        assert data["modele"] == "Clio"
        assert data["annee"] == "2018"
        assert data["kilometrage"] == "85000"
        assert data["etat"] == "roule"
        assert data["carburant"] == "essence"
        assert data["boite"] == "manuelle"
        assert data["nom"] == "Jean Test"
        assert data["telephone"] == "0470123456"
        assert data["email"] == "test@example.com"
        assert data["code_postal"] == "1000"
        assert data["ville"] == "Bruxelles"
        
        print(f"✓ Retrieved existing estimation with prix_souhaite: {test_id}")
    
    def test_get_nonexistent_estimation(self):
        """Test 404 for non-existent estimation"""
        fake_id = "nonexistent-id-12345"
        
        response = requests.get(f"{BASE_URL}/api/estimations/{fake_id}")
        
        assert response.status_code == 404
        print("✓ 404 returned for non-existent estimation")
    
    def test_estimation_response_structure(self):
        """Test that estimation response contains all expected fields"""
        test_id = "a4a9f19a-505b-4fb7-b717-459af12f5e85"
        
        response = requests.get(f"{BASE_URL}/api/estimations/{test_id}")
        assert response.status_code == 200
        
        data = response.json()
        
        # Check all required fields are present
        required_fields = [
            "id", "marque", "modele", "annee", "kilometrage", "etat",
            "carburant", "boite", "nom", "telephone", "email",
            "code_postal", "ville", "rgpd_consent", "photos",
            "created_at", "status"
        ]
        
        for field in required_fields:
            assert field in data, f"Missing required field: {field}"
        
        # Check optional fields
        assert "immatriculation" in data  # Should be present (can be None)
        assert "prix_souhaite" in data  # Should be present (can be None)
        
        print("✓ Estimation response structure is correct")
    
    def test_rgpd_consent_required(self):
        """Test that RGPD consent is required"""
        data = self.base_estimation_data.copy()
        data["rgpd_consent"] = False
        
        response = requests.post(f"{BASE_URL}/api/estimations", json=data)
        
        assert response.status_code == 400, f"Expected 400 for missing RGPD consent, got {response.status_code}"
        print("✓ RGPD consent validation working")
    
    def test_list_estimations(self):
        """Test listing all estimations"""
        response = requests.get(f"{BASE_URL}/api/estimations")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0, "Should have at least one estimation"
        
        # Check that prix_souhaite field exists in list items
        for est in data:
            assert "prix_souhaite" in est or est.get("prix_souhaite") is None
        
        print(f"✓ Listed {len(data)} estimations")


class TestContactAPI:
    """Tests for contact API endpoints"""
    
    def test_create_contact(self):
        """Test creating a contact message"""
        data = {
            "nom": "TEST_Contact User",
            "email": "test_contact@example.com",
            "telephone": "0470999888",
            "message": "Test message for contact form"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=data)
        
        assert response.status_code == 200
        result = response.json()
        assert "id" in result
        assert result["nom"] == data["nom"]
        assert result["email"] == data["email"]
        
        print("✓ Contact message created successfully")
    
    def test_list_contacts(self):
        """Test listing contact messages"""
        response = requests.get(f"{BASE_URL}/api/contact")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        
        print(f"✓ Listed {len(data)} contact messages")


class TestStatsAPI:
    """Tests for stats API endpoint"""
    
    def test_get_stats(self):
        """Test getting dashboard statistics"""
        response = requests.get(f"{BASE_URL}/api/stats")
        
        assert response.status_code == 200
        data = response.json()
        
        assert "total_estimations" in data
        assert "new_estimations" in data
        assert "total_contacts" in data
        assert isinstance(data["total_estimations"], int)
        assert isinstance(data["new_estimations"], int)
        assert isinstance(data["total_contacts"], int)
        
        print(f"✓ Stats: {data['total_estimations']} estimations, {data['total_contacts']} contacts")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
