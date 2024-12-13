from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from django.contrib.auth.models import User

from .serializer import UserSerializer, ProfileSerializer

from .models import Profile

# Create your views here.

class RegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully!"}, status=HTTP_201_CREATED)
        
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    

# get a profil information

class ProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, uName=None):

        try: 
            # get a user id using a passed username
            userId = User.objects.get(username=uName)

            
            # get the profile using the found user Id
            profile = Profile.objects.get(user_id=userId)


            serializer = ProfileSerializer(profile)
            return Response(serializer.data, status=200)

        except Profile.DoesNotExist:
            return Response({'error': 'Profile not found'})    