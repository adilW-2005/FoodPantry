"""
URL configuration for FoodPantry project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/client/", include("backend.apps.clients.urls")),
    path("api/auth/", include("backend.apps.auth.urls")),
    path("api/employee/", include("backend.apps.employees.urls")),
    path("api/inventory/", include("backend.apps.inventory.urls")),
    path("api/visits/", include("backend.apps.visits.urls")),
]
