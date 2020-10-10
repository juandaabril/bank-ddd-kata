from abc import ABC

from core.shared.domain.bus.domain_event import DomainEvent


class CustomerWasCreated(DomainEvent):



    def __init__(self, aggregate_id: str, event_id: str, occurred_on: str):
        super().__init__(aggregate_id, event_id, occurred_on)


    def toJson(self) -> str:
        pass