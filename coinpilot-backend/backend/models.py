from django.db import models

class Bank(models.Model):
    name = models.CharField(max_length=100)
    swift_code = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.name

class Account(models.Model):
    ACCOUNT_TYPE_CHOICES = [
        ('CHECKING', 'Checking'),
        ('SAVINGS', 'Savings'),
        ('BROKERAGE', 'Brokerage'),
    ]
    bank = models.ForeignKey(Bank, on_delete=models.CASCADE, related_name='accounts')
    owner_name = models.CharField(max_length=100)
    account_number = models.CharField(max_length=30, unique=True)
    account_type = models.CharField(max_length=20, choices=ACCOUNT_TYPE_CHOICES)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.owner_name} - {self.account_number}"

class Transaction(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='transactions')
    date = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=255, blank=True)
    is_credit = models.BooleanField()  # True for deposit, False for withdrawal

    def __str__(self):
        type_str = "Credit" if self.is_credit else "Debit"
        return f"{type_str} {self.amount} on {self.date.date()}"
