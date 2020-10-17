import json
import uuid
from abc import ABCMeta, abstractmethod
from datetime import datetime


class DomainEvent(metaclass=ABCMeta):
    _event_id: str
    _occurred_on: str

    def __init__(self, event_id='', occurred_on=''):
        self._event_id = event_id or str(uuid.uuid4())
        self._occurred_on = occurred_on or datetime.now().strftime('%d/%m/%Y %H:%M:%S')

    def to_json(self) -> str:
        return json.dumps({
            'eventId': self.event_id,
            'occurredOn': self.occurred_on,
            'type': self.type,
            'body': self.body()
        })

    @abstractmethod
    def body(self) -> dict:
        raise NotImplemented()

    @property
    def event_id(self) -> str:
        return self._event_id

    @property
    def occurred_on(self) -> str:
        return self._occurred_on

    @property
    def type(self) -> str:
        return self.__class__.__name__
