from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST

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
    def get(self, request):
        profile = Profile.objects.all()
        serializer = ProfileSerializer(profile, many=True)
        return Response({
            "status": True,
            "data": serializer.data
        })


# class ProfileView(APIView):
#     def get(self, request):
#         profile = Profile.objects.get(user=request.user)
#         serializer = ProfileSerializer(profile)
#         return Response({
#             "status": True,
#             "data": serializer.data
#         })
