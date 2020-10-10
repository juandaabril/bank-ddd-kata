from core.customer.application.create_customer import CreateCustomer
from core.customer.domain.customer_repository import CustomerRepository
from core.customer.infrastructure.inmemory_customer_repository import InMemoryCustomerRepository

customer_repository: CustomerRepository = InMemoryCustomerRepository()
create_customer = CreateCustomer(customer_repository)

provider = {
    'create_customer': create_customer
}


class ProviderMiddleware:
    def process_request(self, request):
        request.provider = provider
