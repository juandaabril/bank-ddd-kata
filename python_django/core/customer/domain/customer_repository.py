from abc import ABCMeta, abstractmethod
from typing import List

from core.customer.domain.customer import Customer
from core.customer.domain.customer_id import CustomerId


class CustomerRepository(metaclass=ABCMeta):

    @abstractmethod
    def find_by_id(self, customer_id: CustomerId) -> Customer:
        raise NotImplemented()

    @abstractmethod
    def store(self, customer: Customer) -> None:
        raise NotImplemented()

    @abstractmethod
    def find_all(self) -> List[Customer]:
        raise NotImplemented()
