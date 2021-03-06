from core.account.domain.accont_id import AccountId
from core.account.domain.deposit_was_made import DepositWasMade
from core.customer.domain.customer_id import CustomerId
from core.shared.base.domain.aggregate_root import AggregateRoot


class Account(AggregateRoot):
    _account_id: AccountId
    _customer_id: CustomerId
    _balance: float

    def __init__(self, account_id: AccountId, customer_id: CustomerId, balance):
        super().__init__()
        self._account_id = account_id
        self._customer_id = customer_id
        self._balance = balance

    @staticmethod
    def create(account_id: AccountId, customer_id: CustomerId):
        return Account(account_id, customer_id, 0)

    def make_deposit(self, amount: float) -> None:
        self._balance += amount
        self.record(DepositWasMade(
            self._account_id.value,
            amount
        ));

    @property
    def id(self) -> AccountId:
        return self._account_id

    @property
    def customer_id(self) -> CustomerId:
        return self._customer_id

    @property
    def balance(self) -> float:
        return self._balance
