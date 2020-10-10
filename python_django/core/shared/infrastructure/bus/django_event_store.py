from typing import List

from core.shared.domain.bus.domain_event import DomainEvent
from core.shared.domain.bus.event_bus import EventBus


class DatabaseEventBus(EventBus):
    def publish(self, events: List[DomainEvent]) -> None:
        pass