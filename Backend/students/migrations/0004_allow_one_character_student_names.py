# Generated for allowing one-character student names.

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("students", "0003_student_is_active_student_is_active_idx"),
    ]

    operations = [
        migrations.AlterField(
            model_name="student",
            name="first_name",
            field=models.CharField(max_length=100, validators=[django.core.validators.MinLengthValidator(1)]),
        ),
        migrations.AlterField(
            model_name="student",
            name="last_name",
            field=models.CharField(max_length=100, validators=[django.core.validators.MinLengthValidator(1)]),
        ),
    ]
