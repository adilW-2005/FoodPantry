from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from backend.apps.employees.models import Employee
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'role')

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
        user = authenticate(username=data['email'], password=data['password'])
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid credentials")

User = get_user_model()

class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = RefreshToken(attrs['refresh'])
        access = refresh.access_token

        # ✅ Get user using the user_id from the token
        user_id = refresh["user_id"]
        try:
            user = User.objects.get(id=user_id)
            access['role'] = user.role
            access['email'] = user.email
            access['name'] = user.name
            access['id'] = user.id
        except User.DoesNotExist:
            # Optional: silently fail or raise
            pass

        data['access'] = str(access)
        return data
