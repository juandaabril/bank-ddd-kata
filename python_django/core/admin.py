from django.contrib import admin

# Register your models here.
from .account.infrastructure.django_account_repository import AccountModel
from .customer.infrastructure.django_customer_repository import CustomerModel

admin.site.register(CustomerModel)
admin.site.register(AccountModel)
