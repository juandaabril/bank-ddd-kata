from typing import List

import pika

from core.shared.bus.domain.domain_event import DomainEvent
from core.shared.bus.domain.event_bus import EventBus


# TODO Mirar como mantener la conexion para no tener que abrila en cada request
class AMQPEventBus(EventBus):

    def __init__(self, user: str, password: str, host: str, port: str):
        self.credentials = pika.PlainCredentials(user, password)
        self.host = host
        self.port = port

    def publish(self, events: List[DomainEvent]) -> None:
        parameters = pika.ConnectionParameters(self.host,
                                               self.port,
                                               '/',
                                               self.credentials,
                                               socket_timeout=2)

        connection = pika.BlockingConnection(parameters)
        channel = connection.channel()
        channel.queue_declare(queue='events', durable=True)
        for event in events:
            print('send')
            print(event.to_json())
            channel.basic_publish(
                exchange='',
                routing_key='events',
                body=event.to_json()
            )
        connection.close()

    def listen(self, callback) -> None:
        parameters = pika.ConnectionParameters(self.host,
                                               self.port,
                                               '/',
                                               self.credentials,
                                               socket_timeout=2)

        connection = pika.BlockingConnection(parameters)
        channel = connection.channel()
        channel.queue_declare(queue='events', durable=True)
        channel.basic_qos(prefetch_count=1)
        channel.basic_consume('events', callback, auto_ack=True)
        channel.start_consuming()
