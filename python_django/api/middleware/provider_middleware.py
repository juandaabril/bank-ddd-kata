import os

from core.customer.application.create_customer import CreateCustomer
from core.customer.application.get_customers import GetCustomers
from core.customer.domain.customer_repository import CustomerRepository
from core.customer.infrastructure.django_customer_repository import DjangoCustomerRepository

#customer_repository: CustomerRepository = InMemoryCustomerRepository()
from core.customer.infrastructure.in_memory_customer_repository import InMemoryCustomerRepository
from core.shared.bus.domain.event_bus import EventBus
from core.shared.bus.domain.event_store_repository import EventStoreRepository
from core.shared.bus.infrastructure.local_event_bus import LocalEventBus

#Repositories
customer_repository: CustomerRepository
event_store: EventStoreRepository

CONFIGURATION = os.environ.get('TODO_ENV_')

if CONFIGURATION == 'MEMORY':
    customer_repository = InMemoryCustomerRepository()
    # TODO event_store
else:
    customer_repository = DjangoCustomerRepository()

event_bus: EventBus = LocalEventBus(event_store)
create_customer = CreateCustomer(customer_repository, event_bus)
get_customers = GetCustomers(customer_repository)

provider = {
    'create_customer': create_customer,
    'get_customers': get_customers
}

class ProviderMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.provider = provider

        response = self.get_response(request)

        return response
