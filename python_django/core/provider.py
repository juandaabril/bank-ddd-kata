from decouple import config

from core.account.application.create_account import CreateAccount
from core.account.domain.account_repository import AccountRepository
from core.account.infrastructure.django_account_repository import DjangoAccountRepository
from core.customer.application.create_customer import CreateCustomer
from core.customer.application.get_customers import GetCustomers
from core.customer.domain.customer_repository import CustomerRepository
from core.customer.infrastructure.django_customer_repository import DjangoCustomerRepository
from core.shared.bus.domain.event_bus import EventBus
from core.shared.bus.infrastructure.rabbitmq_event_bus import AMQPEventBus


class Provider:
    _create_customer: CreateCustomer
    _get_customers: GetCustomers
    _create_account: CreateAccount
    _event_bus: EventBus

    def __init__(self):
        # Infrastructure
        customer_repository: CustomerRepository = DjangoCustomerRepository()
        account_repository: AccountRepository = DjangoAccountRepository()

        # InfrastructureServices
        self._event_bus: EventBus = AMQPEventBus(
            config("RABBIT_USER"),
            config("RABBIT_PASSWORD"),
            config("RABBIT_HOST"),
            config("RABBIT_PORT"),
        )

        # Application Services
        self._create_customer = CreateCustomer(customer_repository, self._event_bus)
        self._get_customers = GetCustomers(customer_repository)
        self._create_account = CreateAccount(account_repository, customer_repository)

    @property
    def create_customer(self) -> CreateCustomer:
        return self._create_customer

    @property
    def get_customer(self) -> GetCustomers:
        return self._get_customers

    @property
    def create_account(self) -> CreateAccount:
        return self._create_account

    @property
    def event_bus(self) -> EventBus:
        return self._event_bus


provider = Provider()
