from rest_framework import serializers
from .models import Visit, VisitGroceryItem, VisitHomeItem

class VisitGroceryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitGroceryItem
        fields = '__all__'

class VisitHomeItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitHomeItem
        fields = '__all__'

class VisitSerializer(serializers.ModelSerializer):
    grocery_items = VisitGroceryItemSerializer(many=True, read_only=True)
    home_items = VisitHomeItemSerializer(many=True, read_only=True)

    class Meta:
        model = Visit
        fields = '__all__'
