from core.shared.bus.domain.domain_event import DomainEvent


class CustomerWasCreated(DomainEvent):
    _customer_id: str
    _customer_first_name: str

    def __init__(self, customer_id: str, customer_first_name: str):
        super().__init__()
        self._customer_id = customer_id
        self._customer_first_name = customer_first_name

    def body(self) -> dict:
        return {
            'customerId': self._customer_id,
            'customerFirstName': self._customer_first_name
        }
