from abc import ABCMeta, abstractmethod
from typing import List

from core.shared.domain.bus.domain_event import DomainEvent


class EventBus(metaclass=ABCMeta):

    @abstractmethod
    def publish(self, events: List[DomainEvent]) -> None:
        raise NotImplemented()
