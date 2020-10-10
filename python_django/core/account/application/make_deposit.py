from core.account.domain.accont_id import AccountId
from core.account.domain.account_repository import AccountRepository
from core.customer.domain.customer_id import CustomerId
from core.customer.domain.customer_repository import CustomerRepository


class MakeDeposit(object):

    _customer_repository: CustomerRepository
    _account_repository: AccountRepository

    def __init__(self, account_repository: AccountRepository, customer_repository: CustomerRepository):
        self._account_repository = account_repository
        self._customer_repository = customer_repository

    def __call__(self, account_id: AccountId, customer_id: CustomerId, amount: float) -> None:
        account = self._account_repository.find_by_id(account_id)

        account.make_deposit(amount)

        self._account_repository.store(account)


