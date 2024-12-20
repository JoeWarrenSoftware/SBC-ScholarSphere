from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.generics import UpdateAPIView
from django.contrib.auth.models import User


from drf_yasg.utils import swagger_auto_schema
from django.contrib.auth import authenticate


from .serializer import SignUpSerializer, ProfileSerializer, LoginSerializer, UpdateUserSerializer

from .models import Profile

# Create your views here.

class RegistrationView(APIView):
    @swagger_auto_schema(request_body=SignUpSerializer)
    def post(self, request):
        serializer = SignUpSerializer(data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully!"}, status=HTTP_201_CREATED)
        
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    

# get a profil information

class ProfileView(APIView):

    #permission_classes = [IsAuthenticated]

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

# update profile

class UpdateProfileView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UpdateUserSerializer

    def get_object(self):
        return get_object_or_404(User, username=self.kwargs['username'])

# login

@swagger_auto_schema(method='post', request_body=LoginSerializer)
@api_view(['POST'])
def loginPost(request):
    serializer = LoginSerializer(data = request.data)
    
    if not serializer.is_valid():
        return Response({
            "status": False,
            "data": serializer.errors
        })
    
    username = serializer.data["username"]
    password = serializer.data["password"]

    user = User.objects.filter(username=username).first()

    user_obj = authenticate(username=username, password=password)
    user_data = {
        'id': user.id,
        'name': f"{user.first_name} {user.last_name}".strip() if user.first_name or user.last_name else user.username,
        'token': str(Token.objects.get_or_create(user=user_obj)[0].key),
    }

    if user_obj:
        return Response({
            "status": True,
            "data": user_data
        })
    
    return Response({
        "status": True,
        "data": {},
        "message": "Invalid Credentials"
    })