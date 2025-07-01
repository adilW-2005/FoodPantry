from django.urls import path
from . import views


urlpatterns = [
    path('qualify/<int:id>', views.qualify_client, name='qualify'),
]