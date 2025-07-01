from django.urls import path
from . import views

app_name = 'clients'

urlpatterns = [
    path('intake', views.intake_client, name='intake')
]

