from core.customer.domain.customer import Customer
from core.customer.domain.customer_id import CustomerId
from core.customer.domain.customer_name import CustomerName
from core.customer.domain.customer_repository import CustomerRepository


class CreateCustomer(object):
    _customer_repository: CustomerRepository

    def __init__(self, customer_repository: CustomerRepository):
        self._customer_repository = customer_repository

    def __call__(self, customer_id: CustomerId, customer_name: CustomerName):
        customer = Customer.create(customer_id, customer_name)
        self._customer_repository.store(customer)