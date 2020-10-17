from abc import ABCMeta, abstractmethod
from typing import List

from core.shared.bus.domain.domain_event import DomainEvent


class EventStoreRepository(metaclass=ABCMeta):

    @abstractmethod
    def save(self, event: DomainEvent) -> None:
        raise NotImplemented()

    @abstractmethod
    def find_all(self) -> List[DomainEvent]:
        pass
