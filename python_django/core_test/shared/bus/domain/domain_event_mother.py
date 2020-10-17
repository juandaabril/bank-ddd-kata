from core.shared.bus.domain.domain_event import DomainEvent


class DummyDomainEvent(DomainEvent):

    def body(self) -> dict:
        return {
            'name': 'hello'
        }


class DomainEventMother:

    @staticmethod
    def random() -> DomainEvent:
        return DummyDomainEvent()
