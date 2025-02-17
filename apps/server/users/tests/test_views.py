from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient


class CreateUserAPIViewTests(TestCase):
    def setUp(self):
        self.user_model = get_user_model()
        self.client = APIClient()
        self.create_user_url = reverse('create-user')
        self.valid_payload = {
            'first_name': 'testuser',
            'email': 'test@example.com',
            'password': 'testpass123'
        }
        self.invalid_payload = {
            'first_name': '',
            'email': 'invalid_email@email.com',
            'password': 'shortpassword'
        }

    def test_create_valid_user(self):
        response = self.client.post(
            self.create_user_url,
            self.valid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertGreaterEqual(self.user_model.objects.count(), 1)
        
        created_user = self.user_model.objects.get()
        self.assertEqual(created_user.email, self.valid_payload['email'])

    def test_create_invalid_user(self):
        response = self.client.post(
            self.create_user_url,
            self.invalid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        with self.assertRaises(self.user_model.DoesNotExist):
            self.user_model.objects.get(email=self.invalid_payload['email'])
