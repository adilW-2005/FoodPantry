from django.db import models

from backend.apps.clients.models import Client
from backend.apps.inventory.models import GroceryBatch, HomeItem

# Create your models here.
class Visit(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)

class VisitGroceryItem(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='grocery_items')
    batch = models.ForeignKey(GroceryBatch, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField()

class VisitHomeItem(models.Model):
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='home_items')
    item = models.ForeignKey(HomeItem, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField()

