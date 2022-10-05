from django.test import TestCase
import pytest
# Create your tests here.

class TestUserProfileViewSet(TestCase):
    
    def setUp(self) -> None:
        return super().setUp()
    
    def tearDown(self) -> None:
        return super().tearDown()
    
    def test_get_user_profile_view_set(self):
        print(self.client.get("users-list"))
        