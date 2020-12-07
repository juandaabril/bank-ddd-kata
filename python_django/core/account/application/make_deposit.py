from core.account.domain.accont_id import AccountId
from core.account.domain.account_repository import AccountRepository
from core.customer.domain.customer_id import CustomerId
from core.customer.domain.customer_repository import CustomerRepository
from core.shared.bus.domain.event_bus import EventBus


class MakeDeposit(object):
    _customer_repository: CustomerRepository
    _account_repository: AccountRepository
    _event_bus: EventBus

    def __init__(self, account_repository: AccountRepository, customer_repository: CustomerRepository,
                 event_bus: EventBus):
        self._account_repository = account_repository
        self._customer_repository = customer_repository
        self._event_bus = event_bus

    def __call__(self, account_id: AccountId, customer_id: CustomerId, amount: float) -> None:
        account = self._account_repository.find_by_id(account_id)

        account.make_deposit(amount)

        self._account_repository.store(account)
        self._event_bus.publish(account.pull_domain_events())
