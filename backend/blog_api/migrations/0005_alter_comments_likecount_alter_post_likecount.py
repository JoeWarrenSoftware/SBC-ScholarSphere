# Generated by Django 5.1.4 on 2024-12-15 23:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog_api', '0004_alter_comments_likecount_alter_post_likecount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comments',
            name='likeCount',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='post',
            name='likeCount',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
