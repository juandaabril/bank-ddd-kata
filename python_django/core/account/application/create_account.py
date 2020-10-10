from core.account.domain.accont_id import AccountId
from core.account.domain.account import Account
from core.account.domain.account_repository import AccountRepository
from core.customer.domain.customer_id import CustomerId
from core.customer.domain.customer_repository import CustomerRepository
from core.customer.domain.exceptions import CustomerNotFound


class CreateAccount(object):
    _account_repository: AccountRepository
    _customer_repository: CustomerRepository

    def __init__(self, account_repository: AccountRepository, customer_repository: CustomerRepository):
        self._account_repository = account_repository
        self._customer_repository = customer_repository

    def __call__(self, account_id: AccountId, customer_id: CustomerId):
        self._ensure_customer_exists(customer_id)

        account = Account.create(account_id, customer_id)

        self._account_repositoryº.store(account)

    def _ensure_customer_exists(self, customer_id):
        customer = self._customer_repository.find_by_id(customer_id)
        if customer is None:
            raise CustomerNotFound()
