import datetime
from rest_framework import serializers
from .models import GroceryBatch, GroceryItem, HomeItem

class GroceryItemSerializer(serializers.ModelSerializer):
    total_quantity = serializers.SerializerMethodField()
    next_batch = serializers.SerializerMethodField()
    batches = serializers.SerializerMethodField()

    class Meta:
        model = GroceryItem
        fields = '__all__'

    def get_total_quantity(self, obj):
        return obj.total_quantity()

    def get_next_batch(self, obj):
        batch = obj.next_batch()
        if batch:
            return GroceryBatchSerializer(batch).data
        return None
    
    def get_batches(self, obj):
        batches = GroceryBatch.objects.filter(item=obj).order_by('expiration_date')
        return GroceryBatchSerializer(batches, many=True).data

class GroceryBatchSerializer(serializers.ModelSerializer):
    days_until_expiration = serializers.SerializerMethodField()
    expiration_date = serializers.DateField()

    class Meta:
        model = GroceryBatch
        fields = ['id','item', 'quantity', 'expiration_date', 'days_until_expiration', 'is_active']

    def get_days_until_expiration(self, obj):
        return obj.days_until_expiration()

        
    
class HomeItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeItem
        fields = '__all__'
    
    def is_low_stock(self, obj):
        return obj.quantity < obj.restock_threshold
    
    def validate_quantity(self, value):
        if value < 0:
            raise serializers.ValidationError("Quantity cannot be negative")
        return value
    
    def is_out_of_stock(self, obj):
        return obj.quantity == 0

