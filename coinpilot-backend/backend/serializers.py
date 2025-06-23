from rest_framework import serializers
from .models import Bank, Account, Transaction

class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = '__all__'

class AccountSerializer(serializers.ModelSerializer):
    bank = BankSerializer(read_only=True)
    bank_id = serializers.PrimaryKeyRelatedField(
        queryset=Bank.objects.all(), source='bank', write_only=True
    )

    class Meta:
        model = Account
        fields = ['id', 'bank', 'bank_id', 'owner_name', 'account_number', 'account_type', 'balance', 'interest', 'created_at']

class TransactionSerializer(serializers.ModelSerializer):
    account = AccountSerializer(read_only=True)
    account_id = serializers.PrimaryKeyRelatedField(
        queryset=Account.objects.all(), source='account', write_only=True
    )

    class Meta:
        model = Transaction
        fields = ['id', 'account', 'account_id', 'date', 'amount', 'description', 'is_credit']
