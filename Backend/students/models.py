from django.core.validators import MinLengthValidator, RegexValidator
from django.db import models


class Student(models.Model):
    class Gender(models.TextChoices):
        MALE = "Male", "Male"
        FEMALE = "Female", "Female"
        OTHER = "Other", "Other"

    first_name = models.CharField(max_length=100, validators=[MinLengthValidator(2)])
    last_name = models.CharField(max_length=100, validators=[MinLengthValidator(2)])
    email = models.EmailField(unique=True)
    phone = models.CharField(
        max_length=15,
        validators=[
            RegexValidator(
                regex=r"^\d{10,15}$",
                message="Phone number must contain 10 to 15 digits.",
            )
        ],
    )
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=Gender.choices)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["first_name"]),
            models.Index(fields=["last_name"]),
            models.Index(fields=["email"]),
        ]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
