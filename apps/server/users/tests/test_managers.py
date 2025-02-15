from django.test import TestCase
from users.managers import CustomUserManager


class UserManagerTestCase(TestCase):
    def setUp(self):
        self.user_data = {
            email = "test@example.com",
            password = "testpass123",
            first_name = "Test",
        }
        
        self.manager = CustomUserManager()

    def test_create_user(self):
        user = self.manager.create_user(**self.user_data)
                
        self.assertEqual(user.email, self.user_data["email"])
        self.assertTrue(user.check_password(self.user_data["password"]))
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
    
    def test_create_superuser(self):
        superuser = self.manager.create_superuser(**self.user_data)

        self.assertEqual(superuser.email, self.user_data["email"])
        self.assertEqual(superuser.check_password(self.user_data["password"]))
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)

    def test_create_user_no_email(self):
        with self.assertRaises(ValueError):
            self.manager.create_user(email="", password="testpass123")

    