# Generated by Django 5.1.4 on 2024-12-19 16:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog_api', '0008_rename_userid_post_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comments',
            name='post',
        ),
        migrations.AddField(
            model_name='comments',
            name='post',
            field=models.ManyToManyField(to='blog_api.post'),
        ),
    ]
