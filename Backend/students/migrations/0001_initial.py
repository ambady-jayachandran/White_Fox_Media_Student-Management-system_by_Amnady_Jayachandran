# Generated for the Student Management Module.
from django.db import migrations, models
import django.core.validators


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Student",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("first_name", models.CharField(max_length=100, validators=[django.core.validators.MinLengthValidator(2)])),
                ("last_name", models.CharField(max_length=100, validators=[django.core.validators.MinLengthValidator(2)])),
                ("email", models.EmailField(max_length=254, unique=True)),
                (
                    "phone",
                    models.CharField(
                        max_length=15,
                        validators=[
                            django.core.validators.RegexValidator(
                                message="Phone number must contain 10 to 15 digits.",
                                regex="^\\d{10,15}$",
                            )
                        ],
                    ),
                ),
                ("date_of_birth", models.DateField()),
                ("gender", models.CharField(choices=[("Male", "Male"), ("Female", "Female"), ("Other", "Other")], max_length=10)),
                ("address", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "ordering": ["-created_at"],
                "indexes": [
                    models.Index(fields=["first_name"], name="students_st_first__bcde10_idx"),
                    models.Index(fields=["last_name"], name="students_st_last_na_a5883e_idx"),
                    models.Index(fields=["email"], name="students_st_email_7581ac_idx"),
                ],
            },
        ),
    ]
