from core.customer.domain.customer_id import CustomerId
from core.customer.domain.customer_name import CustomerName
from core.customer.domain.customer_was_created import CustomerWasCreated
from core.shared.base.domain.aggregate_root import AggregateRoot


class Customer(AggregateRoot):
    _customer_id: CustomerId
    _customer_name: CustomerName

    def __init__(self, customer_id: CustomerId, customer_name: CustomerName):
        self._customer_id = customer_id
        self._customer_name = customer_name

    @staticmethod
    def create(customer_id: CustomerId, customer_name: CustomerName):
        customer = Customer(customer_id, customer_name)
        print(customer_name.value)
        customer.record(
            CustomerWasCreated(customer_id.value, customer_name.value)
        )

        return customer

    @property
    def id(self) -> CustomerId:
        return self._customer_id

    @property
    def name(self) -> CustomerName:
        return self._customer_name
