from django.urls import path
from .views import *

urlpatterns = [
    path("view_all_visits/", view_all_visits),
    path("view_visit/", view_visit),
    path("view_my_visit/", view_my_visit),
    path("view_my_visit_history/", view_my_visit_history),
    path("start_visit/", start_visit),
    path("view_inventory/", view_inventory),
    path("submit_visit/", submit_visit),
    path("edit_visit/", edit_visit),
]