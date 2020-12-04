import json
import unittest

from core.shared.bus.domain.domain_event import DomainEvent
from core_test.shared.base.domain.uuid_mother import UUIDMother


class DummyDomainEvent(DomainEvent):

    def body(self) -> dict:
        return {
            'name': 'hello'
        }


class MyTestCase(unittest.TestCase):
    def test_domain_event_to_json(self):
        any_uuid = UUIDMother.random().value
        any_date = '20/11/2020 09:47:35'

        domain_event = DummyDomainEvent(any_uuid, any_date)

        self.assertEqual(
            domain_event.to_json(),
            json.dumps({
                'eventId': any_uuid,
                'occurredOn': any_date,
                'event_type': 'DummyDomainEvent',
                'body': {
                    'name': 'hello'
                }
            })
        )


if __name__ == '__main__':
    unittest.main()
