from django.http import JsonResponse
from django.shortcuts import render
from .permissions import IsEmployeeUser
from backend.apps.clients.models import Client
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsEmployeeUser])
def qualify_client(request, id):
    try:
        client = Client.objects.get(id = id)
        client.qualified = True
        client.save()
        return JsonResponse({'message': 'Client qualified'})
    except Client.DoesNotExist:
        return JsonResponse({'error': 'Client not found'}, status=404)
