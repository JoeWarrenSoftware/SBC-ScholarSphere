# Generated by Django 5.1.4 on 2024-12-19 20:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog_api', '0010_remove_comments_post_comments_post'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='newComments',
            field=models.JSONField(default=list),
        ),
    ]
