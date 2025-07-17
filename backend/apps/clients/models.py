from django.db import models
from backend.apps.auth.models import User

# Create your models here.
# clients/models.py

class Client(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="client_profile")
    # Personal Info
    full_name = models.CharField(max_length=100)
    dob = models.DateField()
    phone = models.CharField(max_length=20)
    email = models.EmailField()

    # Household Info
    num_children = models.IntegerField(blank=True)
    num_adults = models.IntegerField(blank=True)

    # Assistance Programs
    snap = models.BooleanField(default=False)
    wic = models.BooleanField(default=False)
    tanf = models.BooleanField(default=False)
    ssi = models.BooleanField(default=False)
    medicaid = models.BooleanField(default=False)

    # Misc
    food_allergies = models.TextField(blank=True)
    consent_signed = models.BooleanField(default=False)
    staff_signature = models.CharField(max_length=100)

    # Docs
    lease_doc = models.FileField(upload_to='client_docs/', blank=True, null=True)
    id_doc = models.FileField(upload_to='client_docs/', blank=True, null=True)
    bank_statement = models.FileField(upload_to='client_docs/', blank=True, null=True)


    # Status
    qualified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
