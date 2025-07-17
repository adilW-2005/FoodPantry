from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
import json
from backend.apps.clients.permissions import IsClientUser
from .models import Client
from rest_framework.permissions import IsAuthenticated
import boto3
from django.conf import settings

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsClientUser])
def intake_client(request):
        try:
            data = request.POST
            files = request.FILES
            
            # Validate required fields
            required_fields = ['full_name', 'dob', 'phone', 'email', 'staff_signature']
            for field in required_fields:
                if not data.get(field):
                    return JsonResponse({'error': f'Missing required field: {field}'}, status=400)
            
            client = Client.objects.create(
                user = request.user,  # if authenticated via JWT or DRF
                full_name=data['full_name'],
                dob=data['dob'],
                phone=data['phone'],
                email=data['email'],
                num_children=int(data.get('num_children', 0)) if data.get('num_children') else 0,
                num_adults=int(data.get('num_adults', 0)) if data.get('num_adults') else 0,
                snap=bool(data.get('snap')),
                wic=bool(data.get('wic')),
                tanf=bool(data.get('tanf')),
                ssi=bool(data.get('ssi')),
                medicaid=bool(data.get('medicaid')),
                food_allergies=data.get('food_allergies', ''),
                consent_signed=bool(data.get('consent_signed')),
                staff_signature=data['staff_signature'],
                lease_doc=files.get('lease_doc'),
                id_doc=files.get('id_doc'),
                bank_statement=files.get('bank_statement'),
                qualified=False
            )
            
            # Log file upload attempts
            for field_name in ['lease_doc', 'id_doc', 'bank_statement']:
                if hasattr(client, field_name) and getattr(client, field_name):
                    file_obj = getattr(client, field_name)                 
                    try:
                        url = file_obj.url
                        
                    except Exception as e:
                        return JsonResponse({'error': str(e)}, status=500)
            
            return JsonResponse({'message': 'Client intake saved', 'client_id': client.id})
        except Exception as e:
            
            return JsonResponse({'error': str(e)}, status=500)

