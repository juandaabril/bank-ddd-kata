from core.account.domain.accont_id import AccountId
from core.transactions.domain.transaction_repository import TransactionRepository


class MakeTransaction(object):

    _transaction_repository: TransactionRepository

    def __init__(self, transaction_repository: TransactionRepository):
        self._transaction_repository = transaction_repository

    def __call__(self, account_id: AccountId, amount: float):
        pass