# Generated by Django 5.1.4 on 2024-12-13 19:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users_api', '0002_rename_firs_name_profile_first_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='likedIn',
            new_name='linkedIn',
        ),
    ]