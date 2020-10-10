from typing import List

from core.customer.domain.customer import Customer
from core.customer.domain.customer_id import CustomerId
from core.customer.domain.customer_repository import CustomerRepository


class InMemoryCustomerRepository(CustomerRepository):

    _database = {}

    def find_by(self, customer_id: CustomerId) -> Customer:
        return self._database.get(customer_id.value, None)

    def store(self, customer: Customer) -> None:
        self._database[customer.id.value] = customer

    def find_all(self) -> List[Customer]:
        return list(self._database.values())

