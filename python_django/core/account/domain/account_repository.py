from abc import ABCMeta, abstractmethod

from core.account.domain.accont_id import AccountId
from core.account.domain.account import Account


class AccountRepository(metaclass=ABCMeta):
    @abstractmethod
    def find_by_id(self, account_id: AccountId) -> Account:
        raise NotImplemented()

    @abstractmethod
    def store(self, account: Account) -> None:
        raise NotImplemented()
