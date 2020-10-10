from core.account.domain.accont_id import AccountId
from core.customer.domain.customer_id import CustomerId


class Account(object):
    _account_id: AccountId
    _customer_id: CustomerId
    _balance: float

    def __init__(self, account_id: AccountId, customer_id: CustomerId, balance):
        self._account_id = account_id
        self._customer_id = customer_id
        self._balance = balance

    @staticmethod
    def create(account_id: AccountId, customer_id: CustomerId):
        return Account(account_id, customer_id, 0)

    def make_deposit(self, amount: float) -> None:
        self._balance += amount

    @property
    def id(self) -> AccountId:
        return self._account_id

    @property
    def customer_id(self) -> CustomerId:
        return self._customer_id

    @property
    def balance(self) -> float:
        return self._balance
