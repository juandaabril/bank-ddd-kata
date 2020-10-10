from abc import ABC

from core.shared.domain.bus.domain_event import DomainEvent


class CustomerWasCreated(DomainEvent):

    customer_name: str

    def __init__(self, aggregate_id: str, customer_name: str):
        super().__init__(aggregate_id)
        self.customer_name = customer_name

    def body(self) -> dict:
        return {
            'name': self.customer_name
        }
