from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets
from django.db import models
from .models import Bank, Account, Transaction
from .serializers import BankSerializer, AccountSerializer, TransactionSerializer

# Create your views here.

class BankViewSet(viewsets.ModelViewSet):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

def total_balance(request):
    total = Account.objects.aggregate(total_balance=models.Sum('balance'))['total_balance'] or 0
    return JsonResponse({'total_balance': float(total)})
