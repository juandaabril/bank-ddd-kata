from typing import List

from core.shared.domain.bus.domain_event import DomainEvent
from core.shared.domain.bus.event_bus import EventBus
from django.db import models


class EventStoreModel(models.Model):
    class Meta:
        db_table = 'event_store'

    id = models.UUIDField(primary_key=True, editable=False)
    occurred_on = models.CharField(max_length=30)
    type = models.CharField(max_length=30)
    json = models.CharField(max_length=30)


class DjangoEventStore(EventBus):
    def publish(self, events: List[DomainEvent]) -> None:
        for event in events:
            model = EventStoreModel(
                id=event.event_id,
                occurred_on=event.occurred_on,
                type=event.type,
                json=event.to_json()
            )

            model.save()
