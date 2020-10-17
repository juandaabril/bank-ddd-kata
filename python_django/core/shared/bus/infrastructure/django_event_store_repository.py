from typing import List

from django.db import models
from core.shared.bus.domain.domain_event import DomainEvent
from core.shared.bus.domain.event_store_repository import EventStoreRepository


class EventStoreModel(models.Model):
    class Meta:
        db_table = 'event_store'

    id = models.UUIDField(primary_key=True, editable=False)
    occurred_on = models.CharField(max_length=30)
    type = models.CharField(max_length=30)
    json = models.CharField(max_length=30)


class DjangoEventStoreRepository(EventStoreRepository):
    def save(self, event: DomainEvent) -> None:
        model = EventStoreModel(
            id=event.event_id,
            occurred_on=event.occurred_on,
            type=event.type,
            json=event.to_json()
        )

        model.save()

    def find_all(self) -> List[DomainEvent]:
        pass
