from django.apps import AppConfig


class UsersApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users_api'

    # importing signals.py
    def ready(self):
        import users_api.signals