from django.contrib.auth.models import User
from django.core.management.base import BaseCommand

from students.models import Student


STUDENTS = [
    {
        "first_name": "Aarav",
        "last_name": "Sharma",
        "email": "aarav.sharma@example.com",
        "phone": "9876543210",
        "date_of_birth": "2005-01-14",
        "gender": Student.Gender.MALE,
        "address": "Mumbai, Maharashtra",
        "is_active": True,
    },
    {
        "first_name": "Diya",
        "last_name": "Patel",
        "email": "diya.patel@example.com",
        "phone": "9876543211",
        "date_of_birth": "2006-03-22",
        "gender": Student.Gender.FEMALE,
        "address": "Ahmedabad, Gujarat",
        "is_active": True,
    },
    {
        "first_name": "Vivaan",
        "last_name": "Rao",
        "email": "vivaan.rao@example.com",
        "phone": "9876543212",
        "date_of_birth": "2005-07-09",
        "gender": Student.Gender.MALE,
        "address": "Bengaluru, Karnataka",
        "is_active": True,
    },
    {
        "first_name": "Anaya",
        "last_name": "Iyer",
        "email": "anaya.iyer@example.com",
        "phone": "9876543213",
        "date_of_birth": "2006-11-18",
        "gender": Student.Gender.FEMALE,
        "address": "Chennai, Tamil Nadu",
        "is_active": False,
    },
    {
        "first_name": "Kabir",
        "last_name": "Khan",
        "email": "kabir.khan@example.com",
        "phone": "9876543214",
        "date_of_birth": "2004-09-03",
        "gender": Student.Gender.MALE,
        "address": "Hyderabad, Telangana",
        "is_active": True,
    },
    {
        "first_name": "Meera",
        "last_name": "Nair",
        "email": "meera.nair@example.com",
        "phone": "9876543215",
        "date_of_birth": "2005-12-27",
        "gender": Student.Gender.FEMALE,
        "address": "Kochi, Kerala",
        "is_active": True,
    },
    {
        "first_name": "Arjun",
        "last_name": "Verma",
        "email": "arjun.verma@example.com",
        "phone": "9876543216",
        "date_of_birth": "2006-05-06",
        "gender": Student.Gender.MALE,
        "address": "Delhi",
        "is_active": False,
    },
    {
        "first_name": "Sara",
        "last_name": "Thomas",
        "email": "sara.thomas@example.com",
        "phone": "9876543217",
        "date_of_birth": "2005-02-11",
        "gender": Student.Gender.FEMALE,
        "address": "Pune, Maharashtra",
        "is_active": True,
    },
    {
        "first_name": "Reyansh",
        "last_name": "Gupta",
        "email": "reyansh.gupta@example.com",
        "phone": "9876543218",
        "date_of_birth": "2004-10-30",
        "gender": Student.Gender.MALE,
        "address": "Jaipur, Rajasthan",
        "is_active": True,
    },
    {
        "first_name": "Nila",
        "last_name": "Das",
        "email": "nila.das@example.com",
        "phone": "9876543219",
        "date_of_birth": "2006-08-16",
        "gender": Student.Gender.OTHER,
        "address": "Kolkata, West Bengal",
        "is_active": True,
    },
]


class Command(BaseCommand):
    help = "Create the default admin user and 10 demo student records."

    def handle(self, *args, **options):
        admin, created = User.objects.get_or_create(
            username="Admin",
            defaults={
                "email": "admin@example.com",
                "is_staff": True,
                "is_superuser": True,
            },
        )
        admin.email = "admin@example.com"
        admin.is_staff = True
        admin.is_superuser = True
        admin.set_password("Admin123")
        admin.save()

        student_count = 0
        for student in STUDENTS:
            Student.objects.update_or_create(
                email=student["email"],
                defaults=student,
            )
            student_count += 1

        action = "Created" if created else "Updated"
        self.stdout.write(self.style.SUCCESS(f"{action} admin user: Admin"))
        self.stdout.write(self.style.SUCCESS(f"Seeded {student_count} students"))
