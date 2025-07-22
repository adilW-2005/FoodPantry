from rest_framework import serializers
from .models import Visit, VisitGroceryItem, VisitHomeItem
from backend.apps.inventory.models import GroceryBatch, GroceryItem, HomeItem

class SimpleGroceryItemSerializer(serializers.ModelSerializer):
    """Simple grocery item serializer for visit details"""
    class Meta:
        model = GroceryItem
        fields = ['id', 'name', 'unit', 'category', 'barcode']

class SimpleBatchSerializer(serializers.ModelSerializer):
    """Simple batch serializer with item details for visits"""
    item = SimpleGroceryItemSerializer(read_only=True)
    days_until_expiration = serializers.SerializerMethodField()

    class Meta:
        model = GroceryBatch
        fields = ['id', 'item', 'quantity', 'expiration_date', 'days_until_expiration', 'is_active', 'created_at']

    def get_days_until_expiration(self, obj):
        return obj.days_until_expiration()

class SimpleHomeItemSerializer(serializers.ModelSerializer):
    """Simple home item serializer for visit details"""
    class Meta:
        model = HomeItem
        fields = ['id', 'name', 'brand', 'category', 'barcode']

class VisitGroceryItemSerializer(serializers.ModelSerializer):
    """Serializer for visit grocery items with full batch and item details"""
    batch = SimpleBatchSerializer(read_only=True)

    class Meta:
        model = VisitGroceryItem
        fields = ['id', 'batch', 'quantity']

class VisitHomeItemSerializer(serializers.ModelSerializer):
    """Serializer for visit home items with full item details"""
    item = SimpleHomeItemSerializer(read_only=True)

    class Meta:
        model = VisitHomeItem
        fields = ['id', 'item', 'quantity']

class VisitSerializer(serializers.ModelSerializer):
    grocery_items = VisitGroceryItemSerializer(many=True, read_only=True)
    home_items = VisitHomeItemSerializer(many=True, read_only=True)

    class Meta:
        model = Visit
        fields = '__all__'
        read_only_fields = ['client']