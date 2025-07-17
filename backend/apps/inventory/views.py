from django.http import JsonResponse
from django.shortcuts import render

from backend.apps.employees.permissions import IsEmployeeUser
from .models import GroceryBatch, GroceryItem, HomeItem
from .serializers import GroceryBatchSerializer, GroceryItemSerializer, HomeItemSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import logging
logger = logging.getLogger(__name__)


# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_all_items(request):
    grocery_data = []
    
    for item in GroceryItem.objects.all():
        item_data = GroceryItemSerializer(item).data
        batches = item.batches.all().order_by('expiration_date')
        item_data['batches'] = GroceryBatchSerializer(batches, many=True).data
        grocery_data.append(item_data)
    home_items = HomeItem.objects.all()
    home_data = HomeItemSerializer(home_items, many=True).data

    return JsonResponse({"grocery_items":grocery_data, "home_items":home_data})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_item(request, id):
    item_type = request.query_params.get("item_type")

    if item_type == "grocery":
        item = GroceryItem.objects.get(id = id)
        item_data = GroceryItemSerializer(item).data
        batches = item.batches.all().order_by('expiration_date')
        item_data['batches'] = GroceryBatchSerializer(batches, many=True).data
        return JsonResponse({"item" : item_data})
    
    if item_type == "home":
        item = HomeItem.objects.get(id = id)
        item_data = HomeItemSerializer(item).data
        return JsonResponse({ "item": item_data })




@api_view(['POST'])
@permission_classes([IsAuthenticated, IsEmployeeUser])
def add_item(request, id):
    item_type = request.data.get("item_type")
    quantity = request.data.get("quantity")

    try:
        quantity = int(request.data.get("quantity"))
    except (TypeError, ValueError):
        return JsonResponse({"error": "Quantity must be a number"}, status=400)
    if quantity < 0:
        return JsonResponse({"error": "Quantity must be non-negative"}, status=400)

    if item_type == "grocery":
        item = GroceryItem.objects.get(id=id)
        if not item.is_active:
            item.is_active = True
            item.save()

        batch_data = {
            "item": item.id,
            "quantity": quantity,
            "expiration_date": request.data.get("expiration_date")
        }

        batch_serializer = GroceryBatchSerializer(data=batch_data)
        if batch_serializer.is_valid():
            batch_serializer.save()
            return JsonResponse({"message": "Grocery batch added successfully"})
        return JsonResponse({"error": batch_serializer.errors}, status=400)
           
    elif item_type == "home":
        item = HomeItem.objects.get(id = id)
        item.quantity += quantity
        if not item.is_active:
            item.is_active = True
        item.save()
        return JsonResponse({"message": "Home item added successfully"})
    else:
        return JsonResponse({"error": "Invalid item type"}, status=400)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsEmployeeUser])
def create_item(request):
    data = request.data
    item_type = data.get("item_type")
    try:
        quantity = int(data.get("quantity"))
    except (TypeError, ValueError):
        return JsonResponse({"error": "Quantity must be a number"}, status=400)

    if quantity < 0:
        return JsonResponse({"error": "Quantity must be non-negative"}, status=400)
    
    if item_type == "grocery":
        item_data = {
            "name": data.get("name"),
            "barcode": data.get("barcode"),
            "unit": data.get("unit"),
            "category": data.get("category"),
            "restock_threshold": data.get("restock_threshold"),
        }
        grocery_item_serializer = GroceryItemSerializer(data = item_data)
        
        if grocery_item_serializer.is_valid():
            grocery_item = grocery_item_serializer.save()
            batch_data = {
                "item": grocery_item.id,
                "quantity": quantity,
                "expiration_date": data.get("expiration_date")
            }
            batch_serializer = GroceryBatchSerializer(data=batch_data)

            if batch_serializer.is_valid():
                batch_serializer.save()        
                return JsonResponse({
                    "message": "Grocery item added successfully",
                    "item_id": grocery_item.id
                }, status=200)
            else:
                logger.error("Batch serializer errors: %s", batch_serializer.errors)  # ← ADD THIS
                grocery_item.delete()
                return JsonResponse({"error": "Batch creation failed", "batch_errors": batch_serializer.errors}, status=400)
        else:
            logger.error("Grocery item serializer errors: %s", grocery_item_serializer.errors)  # ← ADD THIS
            return JsonResponse({"error": "Grocery item creation failed", "item_errors": grocery_item_serializer.errors}, status=400)

    if item_type == "home":
        item_data = {
            "name": data.get("name"),
            "barcode": data.get("barcode"),
            "quantity": quantity,
            "brand": data.get("brand"),
            "category": data.get("category"),
            "restock_threshold": data.get("restock_threshold")
        }
        home_item_serializer = HomeItemSerializer(data = item_data)

        if home_item_serializer.is_valid():
            home_item_serializer.save()

            return JsonResponse({"message": "Home item added successfully"})
        return JsonResponse({"error": home_item_serializer.errors}, status=400)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsEmployeeUser])
def decrease_item_quantity(request, id):
    data = request.data
    item_type = data.get("item_type")
    try:
        quantity = int(data.get("quantity"))
        if quantity < 0:
            return JsonResponse({"error": "Quantity must be non-negative"}, status=400)
    except (TypeError, ValueError):
        return JsonResponse({"error": "Quantity must be a valid number"}, status=400)

    if item_type == "grocery":
        batch = GroceryBatch.objects.get(id=id)
        batch.quantity = max(0, batch.quantity - quantity)
        if batch.quantity == 0:
            batch.delete()
        else:
            batch.save()

        if batch.item.total_quantity() == 0:
            batch.item.is_active = False
            batch.item.save()

        return JsonResponse({"message": "Grocery batch quantity decreased successfully"})
    
    if item_type == "home":
        item = HomeItem.objects.get(id=id)
        item.quantity = max(0, item.quantity - quantity)
        if item.quantity == 0:
            item.is_active = False
        item.save()
        return JsonResponse({"message": "Home item quantity decreased successfully"})

@api_view(['POST'])
def delete_item(request, id):
    data = request.data
    item_type = data.get("item_type")
    
    if item_type == "grocery":
        item = GroceryItem.objects.get(id = id)
        item.is_active = False
        item.save()
        item.batches.all().delete()

        return JsonResponse({"message": "Grocery item marked inactive and batches deleted"})
    
    if item_type == "home":
        item = HomeItem.objects.get(id = id)
        item.quantity = 0
        item.is_active = False       
        item.save()

        return JsonResponse({"message": "Home item marked inactive and deleted"})
    
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsEmployeeUser])
def edit_batch(request, id):
    data = request.data
    batch = GroceryBatch.objects.get(id = id)
    if "quantity" in data:
        try:
            quantity = int(data["quantity"])
            if quantity < 0:
                return JsonResponse({"error": "Quantity must be non-negative"}, status=400)
            batch.quantity = quantity
        except ValueError:
            return JsonResponse({"error": "Quantity must be a number"}, status=400)
    if "expiration_date" in data:
        batch.expiration_date = data["expiration_date"]

    batch.save()
    return JsonResponse({"message": "Batch updated successfully"})

