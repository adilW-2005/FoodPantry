from django.http import JsonResponse
from django.shortcuts import render
from .permissions import IsEmployeeUser
from backend.apps.clients.models import Client
from backend.apps.clients.serializers import ClientSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsEmployeeUser])
def list_clients(request):
    """
    View to list all clients for employees
    """
    clients = Client.objects.all().order_by('-created_at')
    serializer = ClientSerializer(clients, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsEmployeeUser])
def get_client(request, id):
    """
    View to get a specific client by ID for employees
    """
    try:
        client = Client.objects.get(id=id)
        serializer = ClientSerializer(client)
        return Response(serializer.data)
    except Client.DoesNotExist:
        return Response({'error': 'Client not found'}, status=status.HTTP_404_NOT_FOUND)

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
    
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsEmployeeUser])
def get_unqualified_clients(request):
    clients = Client.objects.filter(qualified=False)
    serializer = ClientSerializer(clients, many=True)
    return Response(serializer.data)
    