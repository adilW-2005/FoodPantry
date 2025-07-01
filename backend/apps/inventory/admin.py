from django.contrib import admin

from backend.apps.inventory.models import GroceryBatch, GroceryItem, HomeItem

# Register your models here.
admin.site.register(GroceryItem)
admin.site.register(GroceryBatch)
admin.site.register(HomeItem)
