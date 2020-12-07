from decouple import config

from core.account.application.create_account import CreateAccount
from core.account.application.make_deposit import MakeDeposit
from core.account.domain.account_repository import AccountRepository
from core.account.infrastructure.django_account_repository import DjangoAccountRepository
from core.customer.application.create_customer import CreateCustomer
from core.customer.application.get_customers import GetCustomers
from core.customer.domain.customer_repository import CustomerRepository
from core.customer.infrastructure.django_customer_repository import DjangoCustomerRepository
from core.shared.bus.domain.event_bus import EventBus
from core.shared.bus.infrastructure.rabbitmq_event_bus import AMQPEventBus


class Provider:
    event_bus: EventBus
    create_customer: CreateCustomer
    get_customers: GetCustomers
    create_account: CreateAccount
    make_deposit: MakeDeposit

    def __init__(self):
        # Infrastructure
        customer_repository: CustomerRepository = DjangoCustomerRepository()
        account_repository: AccountRepository = DjangoAccountRepository()

        # InfrastructureServices
        self.event_bus: EventBus = AMQPEventBus(
            config("RABBIT_USER"),
            config("RABBIT_PASSWORD"),
            config("RABBIT_HOST"),
            config("RABBIT_PORT"),
        )

        # Application Services
        self.create_customer = CreateCustomer(customer_repository, self.event_bus)
        self.get_customers = GetCustomers(customer_repository)

        self.create_account = CreateAccount(account_repository, customer_repository)
        self.make_deposit = MakeDeposit(account_repository, customer_repository, self.event_bus)


provider = Provider()
