from core.account.domain.account import Account
from core.customer.domain.customer_id import CustomerId
from core_test.account.domain.accont_id_mother import AccountIdMother


class AccountMother(object):
    @staticmethod
    def with_zero_balance_and_customer_id(customer_id: CustomerId) -> Account:
        account_id = AccountIdMother.random()
        return Account(account_id, customer_id, 0)
