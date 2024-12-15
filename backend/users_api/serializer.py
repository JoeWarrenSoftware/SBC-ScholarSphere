from rest_framework import serializers
from django.contrib.auth.models import User
from .models import  Profile


# user signup
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
        if User.objects.filter(email=value).exists():
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

        profile, created = Profile.objects.get_or_create(user=user)
        profile.first_name = first_name
        profile.last_name = last_name
        profile.save()

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


# update user/profile
class UpdateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    department = serializers.CharField(required=False, allow_blank=True)
    bio = serializers.CharField(required=False, allow_blank=True)
    twitter = serializers.URLField(required=False, allow_blank=True)
    facebook = serializers.URLField(required=False, allow_blank=True)
    linkedIn = serializers.URLField(required=False, allow_blank=True)
    profile_pic_url = serializers.URLField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields= ('username', 'email', 'first_name', 'last_name', 'department', 'bio', 'twitter', 'facebook', 'linkedIn', 'profile_pic_url')
        extra_kwargs = {
            'email' : {'required': True},
            'username' : {'required': True}
        }

    def validate_email(self, value):
        user = self.context['request'].user
        
        if value != user.email:
            if User.objects.exclude(username=user.username).filter(email=value).exists():
                raise serializers.ValidationError("This email is alredy in use.")
        return value
    
    def validate_username(self, value):
        user = self.context['request'].user
        print(user)

        if value != user.username:
            if User.objects.exclude(username=user.username).filter(username=value).exists():
                raise serializers.ValidationError("This username is alredy in use.")
        return value
    
    def update(self, instance, validated_data):
        # User fields
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        # Profile fields
        profile = instance.profile
        profile.first_name = validated_data.get('first_name', profile.first_name)
        profile.last_name = validated_data.get('last_name', profile.last_name)
        profile.department = validated_data.get('department', profile.department)
        profile.bio = validated_data.get('bio', profile.department)
        profile.twitter = validated_data.get('twitter', profile.twitter)
        profile.facebook = validated_data.get('facebook', profile.facebook)
        profile.linkedIn = validated_data.get('linkedIn', profile.linkedIn)
        profile.profile_pic_url = validated_data.get('profile_pic_url', profile.profile_pic_url)
        profile.save()

        return instance