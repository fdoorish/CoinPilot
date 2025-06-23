from rest_framework import routers
from django.urls import path
from . import views

router = routers.DefaultRouter()
router.register(r'banks', views.BankViewSet)
router.register(r'accounts', views.AccountViewSet)
router.register(r'transactions', views.TransactionViewSet)

urlpatterns = [
    path('accounts/total-balance/', views.total_balance, name='total-balance'),
] + router.urls
