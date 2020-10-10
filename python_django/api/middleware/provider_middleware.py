from core.customer.application.create_customer import CreateCustomer
from core.customer.application.get_customers import GetCustomers
from core.customer.domain.customer_repository import CustomerRepository
from core.customer.infrastructure.in_memory_customer_repository import InMemoryCustomerRepository

customer_repository: CustomerRepository = InMemoryCustomerRepository()
create_customer = CreateCustomer(customer_repository)
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
