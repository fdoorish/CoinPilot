from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'banks', views.BankViewSet)
router.register(r'accounts', views.AccountViewSet)
router.register(r'transactions', views.TransactionViewSet)

urlpatterns = router.urls
