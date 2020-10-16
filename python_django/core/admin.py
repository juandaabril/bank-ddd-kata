from django.contrib import admin

# Register your models here.
from .customer.infrastructure.django_customer_repository import CustomerModel
from .shared.infrastructure.bus.django_event_store import EventStoreModel

admin.site.register(CustomerModel)
admin.site.register(EventStoreModel)
