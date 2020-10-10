import uuid
from abc import ABCMeta, abstractmethod
from datetime import datetime


class DomainEvent(metaclass=ABCMeta):
    _aggregate_id: str
    _event_id: str
    _occurred_on: str

    def __init__(self, aggregate_id: str, event_id='', occurred_on=''):
        self._aggregate_id = aggregate_id
        self._event_id = event_id or str(uuid.uuid4())
        self._occurred_on = occurred_on or datetime.now().strftime('%d/%m/%Y %H:%M:%S')

    @abstractmethod
    def body(self) -> dict:
        raise NotImplemented()

    @property
    def aggregate_id(self) -> str:
        return self._aggregate_id

    @property
    def event_id(self) -> str:
        return self._event_id

    @property
    def occurred_on(self) -> str:
        return self._occurred_on
