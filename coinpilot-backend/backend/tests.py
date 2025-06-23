from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from decimal import Decimal
from .models import Bank, Account, Transaction

class BankTests(APITestCase):
    def test_create_bank(self):
        url = reverse('bank-list')
        data = {'name': 'Test Bank'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Bank.objects.count(), 1)
        self.assertEqual(Bank.objects.get().name, 'Test Bank')

class AccountTests(APITestCase):
    def setUp(self):
        self.bank = Bank.objects.create(name='Test Bank')

    def test_create_account(self):
        url = reverse('account-list')
        data = {
            'bank_id': self.bank.id,  # <-- changed from 'bank' to 'bank_id'
            'owner_name': 'Test Owner',
            'account_number': '1234567890',
            'account_type': 'CHECKING',
            'balance': '100.00',
            'interest': '1.50'
        }
        response = self.client.post(url, data, format='json')
        if response.status_code != status.HTTP_201_CREATED:
            print("Account creation failed:", response.content)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Account.objects.count(), 1)
        account = Account.objects.get()
        self.assertEqual(account.balance, Decimal('100.00'))
        self.assertEqual(account.owner_name, 'Test Owner')

class TransactionTests(APITestCase):
    def setUp(self):
        self.bank = Bank.objects.create(name='Test Bank')
        self.account = Account.objects.create(
            bank=self.bank,
            owner_name='Test Owner',
            account_number='1234567890',
            account_type='CHECKING',
            balance=Decimal('100.00'),
            interest=Decimal('1.50')
        )

    def test_create_transaction(self):
        url = reverse('transaction-list')
        data = {
            'account_id': self.account.id,  # <-- changed from 'account' to 'account_id'
            'amount': '50.00',
            'is_credit': True,
            'description': 'Deposit'
        }
        response = self.client.post(url, data, format='json')
        if response.status_code != status.HTTP_201_CREATED:
            print("Transaction creation failed:", response.content)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Transaction.objects.count(), 1)
        transaction = Transaction.objects.get()
        self.assertEqual(transaction.amount, Decimal('50.00'))
        self.assertTrue(transaction.is_credit)

class TotalBalanceTests(APITestCase):
    def setUp(self):
        self.bank = Bank.objects.create(name='Test Bank')
        Account.objects.create(
            bank=self.bank,
            owner_name='A1',
            account_number='111',
            account_type='CHECKING',
            balance=Decimal('100.00'),
            interest=Decimal('1.00')
        )
        Account.objects.create(
            bank=self.bank,
            owner_name='A2',
            account_number='222',
            account_type='SAVINGS',
            balance=Decimal('200.00'),
            interest=Decimal('2.00')
        )

    def test_total_balance(self):
        url = reverse('total-balance')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertIn('total_balance', data)
        self.assertEqual(float(data['total_balance']), 300.00)
