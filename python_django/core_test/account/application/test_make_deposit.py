import unittest

from hamcrest import *

from core.account.application.make_deposit import MakeDeposit
from core.account.domain.account_repository import AccountRepository
from core.account.infrastructure.in_memory_account_repository import InMemoryAccountRepository
from core.customer.domain.customer_repository import CustomerRepository
from core.customer.infrastructure.in_memory_customer_repository import InMemoryCustomerRepository
from core_test.account.domain.account_mother import AccountMother
from core_test.customer.domain.customer_mother import CustomerMother


class TestMakeDeposit(unittest.TestCase):
    account_repository: AccountRepository
    customer_repository: CustomerRepository
    make_deposit: MakeDeposit

    def test_should_create_an_account(self):
        customer = CustomerMother.random()
        account = AccountMother.with_zero_balance_and_customer_id(customer.id)

        self.given_a_make_deposit_use_case()
        self.and_existing_customer(customer)
        self.and_existing_account(account)

        self.when_make_a_deposit(account.id, customer.id, 500)

        self.then_the_account_balance_is(account.id, 500)

    def given_a_make_deposit_use_case(self):
        self.account_repository = InMemoryAccountRepository()
        self.customer_repository = InMemoryCustomerRepository()
        self.make_deposit = MakeDeposit(self.account_repository, self.customer_repository)

    def and_existing_customer(self, customer):
        self.customer_repository.store(customer)

    def and_existing_account(self, account):
        self.account_repository.store(account)

    def when_make_a_deposit(self, account_id, customer_id, amount: float):
        self.make_deposit(account_id, customer_id, amount)

    def then_the_account_balance_is(self, account_id, balance: float):
        account = self.account_repository.find_by_id(account_id)
        assert_that(account, not_none())
        assert_that(account.id, equal_to(account_id))
        assert_that(account.balance, equal_to(balance))


if __name__ == '__main__':
    unittest.main()
