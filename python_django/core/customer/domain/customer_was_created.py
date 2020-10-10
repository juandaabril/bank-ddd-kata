from abc import ABC

from core.shared.domain.bus.domain_event import DomainEvent


class CustomerWasCreated(DomainEvent):
    customer_id: str
    customer_name: str

    def __init__(self, customer_id: str, customer_name: str):
        super().__init__()
        self.customer_id = customer_id
        self.customer_name = customer_name

    def body(self) -> dict:
        return {
            'customerId': self.customer_id,
            'name': self.customer_name
        }
