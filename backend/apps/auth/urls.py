from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("register", views.RegisterView.as_view(), name="register"),
    path("login", views.LoginView.as_view(), name="login"),
    path("refresh", views.CustomTokenRefreshView.as_view(), name="refresh")
]