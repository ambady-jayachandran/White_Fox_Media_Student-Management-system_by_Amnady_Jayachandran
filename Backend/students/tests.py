from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .models import Student
from .serializers import StudentSerializer


class StudentModelTests(TestCase):
    def test_student_string_representation(self):
        student = Student.objects.create(
            first_name="John",
            last_name="Doe",
            email="john@example.com",
            phone="9876543210",
            date_of_birth="2005-08-15",
            gender="Male",
            address="New York",
        )

        self.assertEqual(str(student), "John Doe")


class StudentSerializerTests(TestCase):
    def test_valid_student_payload(self):
        serializer = StudentSerializer(
            data={
                "first_name": "Jane",
                "last_name": "Doe",
                "email": "jane@example.com",
                "phone": "9876543210",
                "date_of_birth": "2006-04-12",
                "gender": "Female",
                "address": "Boston",
                "is_active": False,
            }
        )

        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertFalse(serializer.validated_data["is_active"])

    def test_accepts_one_character_names(self):
        serializer = StudentSerializer(
            data={
                "first_name": "J",
                "last_name": "D",
                "email": "short@example.com",
                "phone": "9876543210",
                "date_of_birth": "2006-04-12",
                "gender": "Female",
                "address": "Boston",
            }
        )

        self.assertTrue(serializer.is_valid(), serializer.errors)


class StudentAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="admin", password="password123")
        login_response = self.client.post(reverse("login"), {"username": "admin", "password": "password123"}, format="json")
        self.access = login_response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access}")

    def test_create_and_list_students(self):
        response = self.client.post(
            reverse("student_list_create"),
            {
                "first_name": "John",
                "last_name": "Doe",
                "email": "john@example.com",
                "phone": "9876543210",
                "date_of_birth": "2005-08-15",
                "gender": "Male",
                "address": "New York",
                "is_active": False,
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data["success"])

        list_response = self.client.get(reverse("student_list_create"), {"search": "john"})
        self.assertEqual(list_response.status_code, status.HTTP_200_OK)
        self.assertEqual(list_response.data["data"]["count"], 1)

        inactive_response = self.client.get(reverse("student_list_create"), {"status": "inactive", "ordering": "is_active"})
        self.assertEqual(inactive_response.status_code, status.HTTP_200_OK)
        self.assertEqual(inactive_response.data["data"]["count"], 1)

    def test_requires_authentication(self):
        self.client.credentials()
        response = self.client.get(reverse("student_list_create"))

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class AuthAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_register_creates_user_and_returns_tokens(self):
        response = self.client.post(
            reverse("register"),
            {
                "username": "newadmin",
                "email": "newadmin@example.com",
                "password": "StrongPass123!",
                "confirm_password": "StrongPass123!",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data["success"])
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertTrue(User.objects.filter(username="newadmin").exists())

    def test_register_rejects_mismatched_passwords(self):
        response = self.client.post(
            reverse("register"),
            {
                "username": "newadmin",
                "email": "newadmin@example.com",
                "password": "StrongPass123!",
                "confirm_password": "DifferentPass123!",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(response.data["success"])

    def test_register_works_with_stale_authorization_header(self):
        self.client.credentials(HTTP_AUTHORIZATION="Bearer stale-token")
        response = self.client.post(
            reverse("register"),
            {
                "username": "staleheader",
                "email": "staleheader@example.com",
                "password": "StrongPass123!",
                "confirm_password": "StrongPass123!",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data["success"])
