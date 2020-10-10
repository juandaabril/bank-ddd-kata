from typing import List

from core.shared.domain.bus.domain_event import DomainEvent
from core.shared.domain.bus.event_bus import EventBus


class InMemoryEventStore(EventBus):

    _database = {}

    def publish(self, events: List[DomainEvent]) -> None:
        for domainEvent in events:
            self._database[domainEvent.event_id] = domainEvent
            print({
                'eventId': domainEvent.event_id,
                'aggregateId': domainEvent.aggregate_id,
                'occurredOn': domainEvent.occurred_on,
                'type': domainEvent.__class__.__name__,
                'body': domainEvent.body()
            })
