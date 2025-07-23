from django.urls import path
from . import views


urlpatterns = [
    path('view_all_clients', views.list_clients, name='view_all_clients'),
    path('view_client/<int:id>', views.get_client, name='view_client'),
    path('qualify/<int:id>', views.qualify_client, name='qualify'),
    path('view_unqualified_clients', views.get_unqualified_clients, name='view_unqualified_clients'),
]