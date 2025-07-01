from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from backend.apps.employees.models import Employee

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'name', 'password', 'role')

    def create(self, validated_data):
        role = validated_data.get('role', 'client')
        user = User.objects.create_user(**validated_data)

        if role == 'employee':
            Employee.objects.create(user=user) 

        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid credentials")
