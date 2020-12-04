from core.customer.domain.customer import Customer
from core.customer.domain.customer_id import CustomerId
from core.customer.domain.customer_first_name import CustomerFirstName
from core.customer.domain.customer_repository import CustomerRepository
from core.shared.bus.domain.event_bus import EventBus


class CreateCustomer(object):
    _customer_repository: CustomerRepository
    _event_bus: EventBus

    def __init__(self, customer_repository: CustomerRepository, event_bus: EventBus):
        self._customer_repository = customer_repository
        self._event_bus = event_bus

    def __call__(self, customer_id: CustomerId, customer_name: CustomerFirstName):
        customer = Customer.create(customer_id, customer_name)

        self._customer_repository.store(customer)
        self._event_bus.publish(customer.pull_domain_events())