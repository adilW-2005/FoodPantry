import os
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from backend.apps.clients.permissions import IsClientUser
from backend.apps.employees.permissions import IsEmployeeUser
from .models import Visit
from .serializers import VisitSerializer
from backend.apps.inventory.models import GroceryBatch, GroceryItem, HomeItem
from backend.apps.inventory.serializers import GroceryBatchSerializer, GroceryItemSerializer, HomeItemSerializer
from .models import VisitGroceryItem, VisitHomeItem

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsEmployeeUser])
def view_all_visits(request):
    visits = Visit.objects.select_related('client') \
        .prefetch_related('grocery_items__batch__item', 'home_items__item')

    serializer = VisitSerializer(visits, many=True)
    return JsonResponse({"visits": serializer.data}, safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsEmployeeUser])
def view_visit(request, id):
    try:
        visit = Visit.objects.select_related('client') \
            .prefetch_related('grocery_items__batch__item', 'home_items__item') \
            .get(id=id)
    except Visit.DoesNotExist:
        return JsonResponse({"error": "Visit not found"}, status=404)

    serializer = VisitSerializer(visit)
    return JsonResponse({"visit": serializer.data}, safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsClientUser])
def view_my_visit(request, id):
    try:
        visit = Visit.objects.select_related('client') \
            .prefetch_related('grocery_items__batch__item', 'home_items__item') \
            .get(id=id, client=request.user.client_profile)
    except Visit.DoesNotExist:
        return JsonResponse({"error": "Visit not found or unauthorized"}, status=404)

    serializer = VisitSerializer(visit)
    return JsonResponse({"visit": serializer.data}, safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsClientUser])
def view_my_visit_history(request):
    visits = Visit.objects.filter(client=request.user.client_profile) \
        .select_related('client') \
        .prefetch_related('grocery_items__batch__item', 'home_items__item') \
        .order_by('-created_at')  # latest visits first

    serializer = VisitSerializer(visits, many=True)
    return JsonResponse({"visits": serializer.data}, safe=False)

# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsClientUser])
def start_visit(request):
    data = request.data

    visit_data = {
        "name": data.get("name"),
        "address": data.get("address"),
    }
    visit_serializer = VisitSerializer(data=visit_data)
    if visit_serializer.is_valid():
        visit = visit_serializer.save(client=request.user.client_profile)                   
        return JsonResponse({
            "message": "Visit started successfully",
            "visit_id": visit.id
        })
            
    return JsonResponse({"error": visit_serializer.errors}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsClientUser])
def view_inventory(request):
    grocery_data = []
    
    for item in GroceryItem.objects.all():
        item_data = GroceryItemSerializer(item).data
        batches = item.batches.all().order_by('expiration_date')
        item_data['batches'] = GroceryBatchSerializer(batches, many=True).data
        grocery_data.append(item_data)
    home_items = HomeItem.objects.all()
    home_data = HomeItemSerializer(home_items, many=True).data

    return JsonResponse({"grocery_items":grocery_data, "home_items":home_data})


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsClientUser])
def submit_visit(request):
    data = request.data
    visit_id = data.get("visit_id")
    grocery_items = data.get("grocery_items")
    home_items = data.get("home_items")
    pin = data.get("pin")

    if pin != os.getenv("PIN"):
        return JsonResponse({"error": "Invalid pin"}, status=400)

    errors = {
        "grocery_items": [],
        "home_items": []
    }

    try:
        visit = Visit.objects.get(id=visit_id, client=request.user.client_profile)
        if visit.completed:
            return JsonResponse({"error": "Visit already completed"}, status=400)

    except Visit.DoesNotExist:
        return JsonResponse({"error": "Invalid visit ID or unauthorized"}, status=400)
    for item in grocery_items:
        batch_id = item.get("batch_id")
        quantity = item.get("quantity")

        batch = GroceryBatch.objects.get(id=batch_id)

        if batch.quantity < quantity:
            errors["grocery_items"].append({"batch_id": batch_id, "error": "Not enough stock"})
            continue

        VisitGroceryItem.objects.create(
            visit=visit,
            batch=batch,
            quantity=quantity
        )
        batch.quantity -= quantity
        if batch.quantity == 0:
            batch.is_active = False
        batch.save()

    # Handle home items
    for item in home_items:
        item_id = item.get("item_id")
        quantity = item.get("quantity")

        home_item = HomeItem.objects.get(id=item_id)          
        if home_item.quantity < quantity:
            errors["home_items"].append({"item_id": item_id, "error": "Not enough stock"})
            continue

        VisitHomeItem.objects.create(
            visit=visit,
            item=home_item,
            quantity=quantity
        )
        home_item.quantity -= quantity
        if home_item.quantity == 0:
            home_item.is_active = False
        home_item.save()

    visit.completed = True
    visit.save()

    if not errors["grocery_items"] and not errors["home_items"]:
        return JsonResponse({"message": "Visit submitted successfully"})
    else:
        return JsonResponse({
            "message": "Visit submitted with some issues",
            "errors": errors
        }, status=207)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsClientUser])
def edit_visit(request):
    data = request.data
    visit_id = data.get("visit_id")
    grocery_items = data.get("grocery_items", [])
    home_items = data.get("home_items", [])
    pin = data.get("pin")

    if pin != os.getenv("PIN"):
        return JsonResponse({"error": "Invalid pin"}, status=400)

    try:
        visit = Visit.objects.get(id=visit_id, client=request.user.client)
    except Visit.DoesNotExist:
        return JsonResponse({"error": "Visit not found or unauthorized"}, status=404)

    # Step 1: Restore inventory from old visit selections
    for item in visit.grocery_items.all():
        batch = item.batch
        batch.quantity += item.quantity
        batch.save()

    for item in visit.home_items.all():
        home_item = item.item
        home_item.quantity += item.quantity
        home_item.is_active = True
        home_item.save()

    # Step 2: Clear old visit records
    visit.grocery_items.all().delete()
    visit.home_items.all().delete()

    # Step 3: Add new selections
    errors = {"grocery_items": [], "home_items": []}

    # Handle grocery items
    for item in grocery_items:
        batch_id = item.get("batch_id")
        quantity = item.get("quantity")

        if not batch_id or quantity is None or quantity <= 0:
            errors["grocery_items"].append({"batch_id": batch_id, "error": "Invalid quantity"})
            continue

        try:
            batch = GroceryBatch.objects.get(id=batch_id)
        except GroceryBatch.DoesNotExist:
            errors["grocery_items"].append({"batch_id": batch_id, "error": "Batch not found"})
            continue

        if batch.quantity < quantity:
            errors["grocery_items"].append({"batch_id": batch_id, "error": "Not enough stock"})
            continue

        VisitGroceryItem.objects.create(visit=visit, batch=batch, quantity=quantity)
        batch.quantity -= quantity
        if batch.quantity == 0:
            batch.is_active = False
        batch.save()

    # Handle home items
    for item in home_items:
        item_id = item.get("item_id")
        quantity = item.get("quantity")

        if not item_id or quantity is None or quantity <= 0:
            errors["home_items"].append({"item_id": item_id, "error": "Invalid quantity"})
            continue

        try:
            home_item = HomeItem.objects.get(id=item_id)
        except HomeItem.DoesNotExist:
            errors["home_items"].append({"item_id": item_id, "error": "Item not found"})
            continue

        if home_item.quantity < quantity:
            errors["home_items"].append({"item_id": item_id, "error": "Not enough stock"})
            continue

        VisitHomeItem.objects.create(visit=visit, item=home_item, quantity=quantity)
        home_item.quantity -= quantity
        if home_item.quantity == 0:
            home_item.is_active = False
        home_item.save()

    return JsonResponse({
        "message": "Visit updated successfully",
        "visit_id": visit.id,
        "errors": errors if errors["grocery_items"] or errors["home_items"] else None
    }, status=207 if errors["grocery_items"] or errors["home_items"] else 200)
