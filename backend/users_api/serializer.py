from rest_framework import serializers
from django.contrib.auth.models import User
from .models import  Profile


# user
class SignUpSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(write_only=True, required=True)
    last_name = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
        }


    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("Email is required.")
        if User.objects.fileter(email=value).exists():
            raise serializers.ValidationError("The email is already exists.")
        return value
    
    
    def create(self, validated_data):

        first_name = validated_data.pop('first_name', None)
        last_name = validated_data.pop('last_name', None)

        user = User.objects.create_user(
            username= validated_data['username'],
            email= validated_data['email'],
            password= validated_data['password']
        )

        profile = Profile.objects.create(user=user)
        profile.first_name = first_name
        profile.last_name = last_name

        return user
    

# get a profile
class ProfileSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(source='user.email', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Profile
        fields = ('username', 'email', 'first_name', 'last_name', 'department', 'bio', 'twitter', 'facebook', 'linkedIn', 'profile_pic_url')



# login 
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()