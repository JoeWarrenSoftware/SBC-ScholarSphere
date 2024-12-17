from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile


#  when a user model is saved it fires this function which creates a Profile instance with a foreign key pointing to the instance of the user
@receiver(post_save, sender=User) # sender who sends the signal in this case the User
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
  

# save the instance  
@receiver(post_save, sender=User) 
def save_profile(sender, instance, **kwargs):
        instance.profile.save()