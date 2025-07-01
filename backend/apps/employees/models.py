from django.db import models
from backend.apps.auth.models import User

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="employee_profile")
    position = models.CharField(max_length=100, blank=True, null=True)
    started_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name} ({self.user.email})"
