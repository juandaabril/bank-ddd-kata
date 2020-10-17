from django.contrib import admin

# Register your models here.
from .customer.infrastructure.django_customer_repository import CustomerModel
from .shared.bus.infrastructure.django_event_store_repository import EventStoreModel

admin.site.register(CustomerModel)
admin.site.register(EventStoreModel)
