from typing import List

from core.shared.domain.bus.domain_event import DomainEvent


class AggregateRoot:
    _domainEvents: List[DomainEvent] = []

    def pull_domain_events(self) -> List[DomainEvent]:
        events = self._domainEvents
        self._domainEvents = []
        return events

    def record(self, domain_event: DomainEvent) -> None:
        self._domainEvents.append(domain_event)
