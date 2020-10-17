from core.account.domain.accont_id import AccountId
from core.account.domain.account import Account
from core.account.domain.account_repository import AccountRepository


class InMemoryAccountRepository(AccountRepository):

    def __init__(self) -> None:
        self._database = {}

    def find_by_id(self, account_id: AccountId) -> Account:
        return self._database.get(account_id.value, None)

    def store(self, account: Account) -> None:
        self._database[account.id.value] = account
