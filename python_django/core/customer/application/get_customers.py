from dataclasses import dataclass

from typing import List

from core.customer.domain.customer import Customer
from core.customer.domain.customer_repository import CustomerRepository


@dataclass
class CustomerResponse:
    id: str
    name: str


def customer_to_response(customer: Customer) -> CustomerResponse:
    return CustomerResponse(
        customer.id.value,
        customer.first_name.value
    )


class GetCustomers(object):
    _customer_repository: CustomerRepository

    def __init__(self, customer_repository):
        self._customer_repository = customer_repository

    def __call__(self) -> List[CustomerResponse]:
        customers = self._customer_repository.find_all()
        return list(map(customer_to_response, customers))
