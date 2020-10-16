from django.core.management.base import BaseCommand

from core.shared.infrastructure.bus.django_event_store import EventStoreModel


class Command(BaseCommand):
    help = 'Send last events to the broker'

    def handle(self, *args, **options):
        events = list(EventStoreModel.objects.all())
        for event in events:
            print(event.json)
