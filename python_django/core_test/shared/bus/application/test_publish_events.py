import unittest
from unittest.mock import create_autospec

from hamcrest import *

from core.shared.bus.application.publish_events import PublishEvents
from core.shared.bus.domain.domain_event import DomainEvent
from core.shared.bus.domain.event_store_repository import EventStoreRepository
from core.shared.bus.domain.message_broker_service import MessageBrokerService
from core.shared.bus.infrastructure.in_memory_event_store_repository import InMemoryEventStoreRepository
from core_test.shared.bus.domain.domain_event_mother import DomainEventMother

ANY_EXCHANGE_NAME = 'any_exchange_name'


class TestPublishEvents(unittest.TestCase):
    event_store_repository: EventStoreRepository
    message_broker_service: MessageBrokerService
    publish_events: PublishEvents

    def test_should_publish_a_event(self):
        domain_event = DomainEventMother.random()

        self.given_publish_event_use_case()
        self.and_a_stored_domain_event(domain_event)

        self.when_execute_publish_events_use_case()

        self.then_the_message_broker_receives_this_event(domain_event)

    def given_publish_event_use_case(self):
        self.event_store_repository = InMemoryEventStoreRepository()
        self.message_broker_service = create_autospec(MessageBrokerService)
        self.publish_events = PublishEvents(
            self.event_store_repository,
            self.message_broker_service
        )

    def and_a_stored_domain_event(self, domain_event: DomainEvent):
        self.event_store_repository.save(domain_event)

    def when_execute_publish_events_use_case(self):
        self.publish_events(ANY_EXCHANGE_NAME)

    def then_the_message_broker_receives_this_event(self, domain_event: DomainEvent):
        events = self.message_broker_service.send.call_args[0]
        print(events)
        assert_that(len(events), equal_to(1))
        assert_that(events[0].event_id, equal_to(domain_event.event_id))
        assert_that(events[0].occurred_on, equal_to(domain_event.occurred_on))
        assert_that(events[0].type, equal_to(domain_event.type))
        assert_that(events[0].body(), equal_to(domain_event.body()))


if __name__ == '__main__':
    unittest.main()
