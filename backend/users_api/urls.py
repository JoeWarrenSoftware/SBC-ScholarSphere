from django.urls import path
from .views import RegistrationView, ProfileView

urlpatterns = [
    path('register/', RegistrationView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile')
]