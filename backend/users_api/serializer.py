from rest_framework import serializers
from django.contrib.auth.models import User
from .models import RegistrationForm, Profile


# user
class UserSerializer(serializers.ModelSerializer):
    profile = serializers.JSONField(write_only= True)


    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'profile']
        extra_kwargs = {'password': {'write_only': True}}

    
    def create(self, validated_data):
        profile_data = validated_data.pop('profile', {})
        user = User.objects.create_user(
            username=validated_data['email'],
            email= validated_data['email'],
            password= validated_data['password']
        )

        Profile.objects.create(user=user, **profile_data)
        return user
    

# get a profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('user', 'first_name', 'last_name', 'department', 'bio', 'twitter', 'facebook', 'likedIn', 'profile_pic_url')
