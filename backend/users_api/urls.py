from django.urls import path
from .views import RegistrationView, ProfileView, loginPost

urlpatterns = [
    path('login', loginPost, name='login_post'),
    path('signup/', RegistrationView.as_view(), name='register'),
    path('profile/<str:uName>', ProfileView.as_view(), name='profile')
]