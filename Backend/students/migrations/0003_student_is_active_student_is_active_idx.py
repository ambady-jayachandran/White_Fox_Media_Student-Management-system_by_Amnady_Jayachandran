from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("students", "0002_rename_students_st_first__bcde10_idx_students_st_first_n_ae97bb_idx_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="student",
            name="is_active",
            field=models.BooleanField(default=True),
        ),
        migrations.AddIndex(
            model_name="student",
            index=models.Index(fields=["is_active"], name="students_st_is_act_86e021_idx"),
        ),
    ]
