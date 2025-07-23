from rest_framework import serializers
from .models import Client
from backend.apps.auth.serializers import UserSerializer

class ClientSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Client
        fields = [
            'id', 'user', 'full_name', 'dob', 'phone', 'email',
            'num_children', 'num_adults', 'snap', 'wic', 'tanf', 
            'ssi', 'medicaid', 'food_allergies', 'consent_signed',
            'staff_signature', 'lease_doc', 'id_doc', 'bank_statement',
            'qualified', 'created_at'
        ]
        read_only_fields = ['id', 'created_at'] 