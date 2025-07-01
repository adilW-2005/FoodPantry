from django.contrib import admin
from .models import Visit, VisitGroceryItem, VisitHomeItem

# Register your models here.
admin.site.register(Visit)
admin.site.register(VisitGroceryItem)
admin.site.register(VisitHomeItem)