"""
Test suite for VendezVotreCar - Admin Dashboard Feature
Tests admin login, estimations list, status update, and delete functionality
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Admin credentials
ADMIN_PASSWORD = "VVC2026Admin!"
ADMIN_SECRET_PATH = "vvc-secret-2026"


class TestAdminLogin:
    """Tests for admin login endpoint"""
    
    def test_admin_login_success(self):
        """Test successful admin login with correct password"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": ADMIN_PASSWORD
        })
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data.get("success") == True, "Login should return success=True"
        assert "message" in data, "Response should contain message"
        
        print("✓ Admin login with correct password successful")
    
    def test_admin_login_wrong_password(self):
        """Test admin login rejection with wrong password"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": "wrong_password_123"
        })
        
        assert response.status_code == 401, f"Expected 401 for wrong password, got {response.status_code}"
        
        print("✓ Admin login with wrong password correctly rejected (401)")
    
    def test_admin_login_empty_password(self):
        """Test admin login rejection with empty password"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": ""
        })
        
        assert response.status_code == 401, f"Expected 401 for empty password, got {response.status_code}"
        
        print("✓ Admin login with empty password correctly rejected")


class TestAdminEstimations:
    """Tests for admin estimations endpoints"""
    
    def test_get_admin_estimations(self):
        """Test getting all estimations for admin dashboard"""
        response = requests.get(f"{BASE_URL}/api/admin/estimations")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        
        # Check that estimations have required fields
        if len(data) > 0:
            est = data[0]
            required_fields = ["id", "marque", "modele", "annee", "kilometrage", 
                             "etat", "nom", "telephone", "email", "ville", "status"]
            for field in required_fields:
                assert field in est, f"Missing field: {field}"
        
        print(f"✓ Retrieved {len(data)} estimations for admin dashboard")
        return data
    
    def test_get_admin_estimations_filter_by_status(self):
        """Test filtering estimations by status"""
        # Test each status filter
        statuses = ["nouveau", "contacte", "traite", "refuse"]
        
        for status in statuses:
            response = requests.get(f"{BASE_URL}/api/admin/estimations?status={status}")
            
            assert response.status_code == 200, f"Expected 200 for status={status}, got {response.status_code}"
            
            data = response.json()
            assert isinstance(data, list)
            
            # Verify all returned items have the correct status
            for est in data:
                assert est.get("status") == status, f"Expected status={status}, got {est.get('status')}"
        
        print("✓ Status filter working for all statuses")
    
    def test_get_admin_estimations_filter_by_ville(self):
        """Test filtering estimations by city"""
        # First get all estimations to find a city
        all_response = requests.get(f"{BASE_URL}/api/admin/estimations")
        all_data = all_response.json()
        
        if len(all_data) > 0:
            test_ville = all_data[0].get("ville")
            
            response = requests.get(f"{BASE_URL}/api/admin/estimations?ville={test_ville}")
            
            assert response.status_code == 200
            data = response.json()
            
            # Verify all returned items contain the city (case-insensitive)
            for est in data:
                assert test_ville.lower() in est.get("ville", "").lower(), \
                    f"Expected ville containing '{test_ville}', got '{est.get('ville')}'"
            
            print(f"✓ City filter working for '{test_ville}'")
        else:
            print("⚠ No estimations to test city filter")
    
    def test_get_admin_estimations_filter_tous(self):
        """Test that 'tous' status returns all estimations"""
        response = requests.get(f"{BASE_URL}/api/admin/estimations?status=tous")
        
        assert response.status_code == 200
        data = response.json()
        
        # Should return all estimations (same as no filter)
        all_response = requests.get(f"{BASE_URL}/api/admin/estimations")
        all_data = all_response.json()
        
        assert len(data) == len(all_data), "status=tous should return all estimations"
        
        print("✓ Status filter 'tous' returns all estimations")


class TestAdminStatusUpdate:
    """Tests for updating estimation status"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Create a test estimation for status update tests"""
        self.test_prefix = f"TEST_{uuid.uuid4().hex[:8]}"
        self.test_estimation_data = {
            "marque": "TestBrand",
            "modele": f"{self.test_prefix}_Model",
            "annee": "2021",
            "kilometrage": "30000",
            "etat": "roule",
            "carburant": "diesel",
            "boite": "automatique",
            "nom": f"{self.test_prefix}_Admin Test",
            "telephone": "0470111222",
            "email": f"{self.test_prefix}@admintest.com",
            "code_postal": "2000",
            "ville": "Anvers",
            "rgpd_consent": True,
            "photos": []
        }
    
    def _create_test_estimation(self):
        """Helper to create a test estimation"""
        response = requests.post(f"{BASE_URL}/api/estimations", json=self.test_estimation_data)
        assert response.status_code == 200
        return response.json()["id"]
    
    def test_update_status_nouveau_to_contacte(self):
        """Test updating status from nouveau to contacte"""
        estimation_id = self._create_test_estimation()
        
        response = requests.patch(
            f"{BASE_URL}/api/admin/estimations/{estimation_id}/status",
            json={"status": "contacte"}
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data.get("success") == True
        
        # Verify the status was updated
        get_response = requests.get(f"{BASE_URL}/api/estimations/{estimation_id}")
        assert get_response.status_code == 200
        assert get_response.json()["status"] == "contacte"
        
        print(f"✓ Status updated from nouveau to contacte for {estimation_id}")
    
    def test_update_status_to_traite(self):
        """Test updating status to traite"""
        estimation_id = self._create_test_estimation()
        
        response = requests.patch(
            f"{BASE_URL}/api/admin/estimations/{estimation_id}/status",
            json={"status": "traite"}
        )
        
        assert response.status_code == 200
        
        # Verify
        get_response = requests.get(f"{BASE_URL}/api/estimations/{estimation_id}")
        assert get_response.json()["status"] == "traite"
        
        print(f"✓ Status updated to traite for {estimation_id}")
    
    def test_update_status_to_refuse(self):
        """Test updating status to refuse"""
        estimation_id = self._create_test_estimation()
        
        response = requests.patch(
            f"{BASE_URL}/api/admin/estimations/{estimation_id}/status",
            json={"status": "refuse"}
        )
        
        assert response.status_code == 200
        
        # Verify
        get_response = requests.get(f"{BASE_URL}/api/estimations/{estimation_id}")
        assert get_response.json()["status"] == "refuse"
        
        print(f"✓ Status updated to refuse for {estimation_id}")
    
    def test_update_status_invalid(self):
        """Test that invalid status is rejected"""
        estimation_id = self._create_test_estimation()
        
        response = requests.patch(
            f"{BASE_URL}/api/admin/estimations/{estimation_id}/status",
            json={"status": "invalid_status"}
        )
        
        assert response.status_code == 400, f"Expected 400 for invalid status, got {response.status_code}"
        
        print("✓ Invalid status correctly rejected (400)")
    
    def test_update_status_nonexistent_estimation(self):
        """Test updating status for non-existent estimation"""
        fake_id = "nonexistent-id-12345"
        
        response = requests.patch(
            f"{BASE_URL}/api/admin/estimations/{fake_id}/status",
            json={"status": "contacte"}
        )
        
        assert response.status_code == 404, f"Expected 404 for non-existent estimation, got {response.status_code}"
        
        print("✓ 404 returned for non-existent estimation status update")


class TestAdminDelete:
    """Tests for deleting estimations"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Create test data"""
        self.test_prefix = f"TEST_{uuid.uuid4().hex[:8]}"
        self.test_estimation_data = {
            "marque": "DeleteTest",
            "modele": f"{self.test_prefix}_ToDelete",
            "annee": "2019",
            "kilometrage": "60000",
            "etat": "accident",
            "carburant": "essence",
            "boite": "manuelle",
            "nom": f"{self.test_prefix}_Delete Test",
            "telephone": "0470333444",
            "email": f"{self.test_prefix}@deletetest.com",
            "code_postal": "3000",
            "ville": "Liège",
            "rgpd_consent": True,
            "photos": []
        }
    
    def _create_test_estimation(self):
        """Helper to create a test estimation"""
        response = requests.post(f"{BASE_URL}/api/estimations", json=self.test_estimation_data)
        assert response.status_code == 200
        return response.json()["id"]
    
    def test_delete_estimation(self):
        """Test deleting an estimation"""
        estimation_id = self._create_test_estimation()
        
        # Verify it exists first
        get_response = requests.get(f"{BASE_URL}/api/estimations/{estimation_id}")
        assert get_response.status_code == 200
        
        # Delete it
        delete_response = requests.delete(f"{BASE_URL}/api/admin/estimations/{estimation_id}")
        
        assert delete_response.status_code == 200, f"Expected 200, got {delete_response.status_code}: {delete_response.text}"
        
        data = delete_response.json()
        assert data.get("success") == True
        
        # Verify it's deleted
        verify_response = requests.get(f"{BASE_URL}/api/estimations/{estimation_id}")
        assert verify_response.status_code == 404, "Deleted estimation should return 404"
        
        print(f"✓ Estimation {estimation_id} deleted successfully")
    
    def test_delete_nonexistent_estimation(self):
        """Test deleting non-existent estimation"""
        fake_id = "nonexistent-delete-id-12345"
        
        response = requests.delete(f"{BASE_URL}/api/admin/estimations/{fake_id}")
        
        assert response.status_code == 404, f"Expected 404 for non-existent estimation, got {response.status_code}"
        
        print("✓ 404 returned for deleting non-existent estimation")


class TestAdminCities:
    """Tests for admin cities endpoint"""
    
    def test_get_cities(self):
        """Test getting list of unique cities"""
        response = requests.get(f"{BASE_URL}/api/admin/cities")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        
        # Cities should be sorted
        if len(data) > 1:
            assert data == sorted(data), "Cities should be sorted alphabetically"
        
        print(f"✓ Retrieved {len(data)} unique cities: {data[:5]}...")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
