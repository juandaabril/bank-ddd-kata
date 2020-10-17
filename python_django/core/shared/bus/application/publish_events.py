from core.shared.bus.domain.event_store_repository import EventStoreRepository
from core.shared.bus.domain.message_broker_service import MessageBrokerService


class PublishEvents(object):
    _event_store_repository: EventStoreRepository
    _message_broker_service: MessageBrokerService

    def __init__(self, event_store_repository: EventStoreRepository,
                 message_broker_service: MessageBrokerService) -> None:
        self._event_store_repository = event_store_repository
        self._message_broker_service = message_broker_service

    def __call__(self, exchange_name: str):
        events = self._event_store_repository.find_all()
        for event in events:
            self._message_broker_service.send(exchange_name, event.type, event.to_json())
