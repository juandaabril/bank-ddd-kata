from typing import List

from core.shared.bus.domain.domain_event import DomainEvent
from core.shared.bus.domain.event_store_repository import EventStoreRepository


class InMemoryEventStoreRepository(EventStoreRepository):

    def __init__(self) -> None:
        self._database = {}

    def save(self, event: DomainEvent) -> None:
        self._database[event.event_id] = event

    def find_all(self) -> List[DomainEvent]:
        return list(self._database.values())
