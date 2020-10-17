from typing import List
from core.shared.bus.domain.domain_event import DomainEvent
from core.shared.bus.domain.event_bus import EventBus
from core.shared.bus.domain.event_store_repository import EventStoreRepository


class LocalEventBus(EventBus):

    _event_store: EventStoreRepository

    def __init__(self, event_store) -> None:
        self._event_store = event_store

    def publish(self, events: List[DomainEvent]) -> None:
        for event in events:
            self._event_store.save(event)
