from django.db import models
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

# Create your models here.


# registration form for user

class RegistrationForm(UserCreationForm):
    email = forms.EmailField(required= True)

    class Meta:
        model = User
        fields = ['email', 'password1', 'password2']

    def save(self, commit= True):
        user = super().save(commit= False)
        # using email as a username to login
        # user.username = self.cleaned_data['email']
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user
    

# create an extension to the user profile

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    department = models.CharField(max_length=50, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    linkedIn = models.URLField(blank=True, null=True)
    profile_pic_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.user.username
