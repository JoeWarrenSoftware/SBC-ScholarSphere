from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib.auth.models import User
from users_api.models import Profile

# Create your models here.

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    author = models.CharField(max_length=100, blank=True)
    title = models.CharField(max_length=200)
    text = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(default=timezone.now)
    modified_date = models.DateTimeField(blank=True, null=True)
    likeCount = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        if self.user:

            profile = Profile.objects.get(user_id=self.user)
            if profile:
                self.author = f"{profile.first_name} {profile.last_name}"

        super(Post, self).save(*args, **kwargs)

    def __str__(self):
        return self.title


class Comments(models.Model):
    # creating one-to-many relationship with this one comment have more comments
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    likeCount = models.PositiveIntegerField(default=0)    

    @property
    def author(self):
        return f"{self.user.first_name} {self.user.last_name}"


    def __str__(self):
        return f"{self.author} commented - {self.text}"