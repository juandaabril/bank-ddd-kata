from core.customer.domain.customer_id import CustomerId
from core.customer.domain.customer_first_name import CustomerFirstName
from core.customer.domain.customer_was_created import CustomerWasCreated
from core.shared.base.domain.aggregate_root import AggregateRoot


class Customer(AggregateRoot):
    _customer_id: CustomerId
    _customer_first_name: CustomerFirstName

    def __init__(self, customer_id: CustomerId, customer_first_name: CustomerFirstName):
        super().__init__()
        self._customer_id = customer_id
        self._customer_first_name = customer_first_name

    @staticmethod
    def create(customer_id: CustomerId, customer_first_name: CustomerFirstName):
        customer = Customer(customer_id, customer_first_name)
        customer.record(
            CustomerWasCreated(customer_id.value, customer_first_name.value)
        )

        return customer

    @property
    def id(self) -> CustomerId:
        return self._customer_id

    @property
    def first_name(self) -> CustomerFirstName:
        return self._customer_first_name
