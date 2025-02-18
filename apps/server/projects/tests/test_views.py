from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status


class ProjectAPIViewTests(TestCase):
    def setUp(self):
        user_data = {
            "first_name": "testuser",
            "email": "testuser@email.com",
            "password": "testpassword",
        }

        self.user = get_user_model().objects.create_user(**user_data)
        self.client = APIClient()

        # authenticate the user
        response = self.client.post(
            reverse("token-obtain-pair"),
            {"email": user_data["email"], "password": user_data["password"]},
        )

        self.token = response.data["access"]

        self.valid_project_data = {
            "creator": self.user.id,
            "name": "Test Project",
        }

        self.invalid_project_data = {
            "creator": None,
            "name": None,
            "description": "Test Description",
        }

        self.update_project_data = {
            "name": "Updated Project",
            "description": "Updated Description",
        }

    def test_create_project(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        response = self.client.post(reverse("project"), self.valid_project_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertContains(response.data["data"], self.valid_project_data)
        self.assertEqual(response.data["data"]["creator"], self.user.id)

    def test_get_project(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        response = self.client.get(reverse("project-detail"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response.data["data"], self.valid_project_data)
        self.assertEqual(response.data["data"]["creator"], self.user.id)

    def test_update_project(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        response = self.client.patch(
            reverse("project-detail"), self.update_project_data
        )

        response_data = response.data["data"]
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response_data["name"], self.update_project_data["name"])
        self.assertEqual(
            response_data["description"], self.update_project_data["description"]
        )

    def test_invalid_project_data(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")
        response = self.client.post(
            reverse("create-project"), self.invalid_project_data
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
