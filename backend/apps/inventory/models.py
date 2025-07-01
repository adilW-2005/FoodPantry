from datetime import timezone
from django.db import models
from backend.apps.auth.models import User

# Abstract base item to link to VisitItems
class Item(models.Model):
    name = models.CharField(max_length=100)
    barcode = models.CharField(max_length=100, unique=True, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

# Grocery item model
class GroceryItem(Item):
    unit = models.CharField(max_length=20)
    category = models.CharField(max_length=50, blank=True, null=True)
    restock_threshold = models.PositiveIntegerField(default=10)

    def total_quantity(self):
        return sum(batch.quantity for batch in self.batches.filter(expiration_date__gte=timezone.now().date()))

    def next_batch(self):
        return self.batches.filter(expiration_date__gte=timezone.now().date()).order_by('expiration_date').first()

    def __str__(self):
        return f"{self.name} ({self.total_quantity()} {self.unit})"


# Home item model (cleaning, hygiene, etc.)
class HomeItem(Item):
    quantity = models.PositiveIntegerField(default=0)
    brand = models.CharField(max_length=100, blank=True, null=True)
    category = models.CharField(max_length=50, blank=True, null=True)
    restock_threshold = models.PositiveIntegerField(default=10)


class GroceryBatch(models.Model):
    item = models.ForeignKey(GroceryItem, related_name='batches', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    expiration_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return self.expiration_date < timezone.now().date()

    def days_until_expiration(self):
        return (self.expiration_date - timezone.now().date()).days

    def __str__(self):
        return f"{self.quantity} {self.item.unit} of {self.item.name} (exp {self.expiration_date})"
