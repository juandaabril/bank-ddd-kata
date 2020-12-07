import json

from django.core.management.base import BaseCommand

from amqp.events.event_handler import event_handler
from core.provider import provider


class Command(BaseCommand):
    help = 'Listen for Events on AMQP'

    def handle(self, *args, **options):
        provider.event_bus.listen(self.callback)
        print('listen')

    def callback(self, ch, method, properties, body):
        dic = json.loads(body)
        event_handler.call(dic['event_type'], dic)