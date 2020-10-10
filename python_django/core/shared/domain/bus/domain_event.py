from abc import ABCMeta, abstractmethod


class DomainEvent(meta=ABCMeta):
    _aggregate_id: str
    _event_id: str
    _occurred_on: str

    def __init__(self, aggregate_id: str, event_id: str, occurred_on: str):
        self.aggregate_id = aggregate_id
        self.event_id = event_id
        self.occurred_on = occurred_on

    @abstractmethod
    def toJson(self) -> str:
        raise NotImplemented()
