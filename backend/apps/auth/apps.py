from django.apps import AppConfig


class AuthConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "backend.apps.auth"
    label = "custom_auth"  # This prevents conflict with Django's built-in auth app
