from abc import ABCMeta, abstractmethod
from typing import List

from core.shared.bus.domain.domain_event import DomainEvent


class EventBus(metaclass=ABCMeta):

    @abstractmethod
    def publish(self, events: List[DomainEvent]) -> None:
        raise NotImplemented()

    @abstractmethod
    def listen(self, callback) -> None:
        raise NotImplemented()
