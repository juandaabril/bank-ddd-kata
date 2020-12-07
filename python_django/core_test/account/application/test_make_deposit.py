import unittest
from unittest.mock import create_autospec

from hamcrest import *

from core.account.application.make_deposit import MakeDeposit
from core.account.domain.accont_id import AccountId
from core.account.domain.account import Account
from core.account.domain.account_repository import AccountRepository
from core.account.infrastructure.in_memory_account_repository import InMemoryAccountRepository
from core.customer.domain.customer import Customer
from core.customer.domain.customer_id import CustomerId
from core.customer.domain.customer_repository import CustomerRepository
from core.customer.infrastructure.in_memory_customer_repository import InMemoryCustomerRepository
from core.shared.bus.domain.event_bus import EventBus
from core_test.account.domain.account_mother import AccountMother
from core_test.customer.domain.customer_mother import CustomerMother


class TestMakeDeposit(unittest.TestCase):
    account_repository: AccountRepository
    customer_repository: CustomerRepository
    make_deposit: MakeDeposit
    event_bus: EventBus

    def test_should_create_an_account(self):
        customer = CustomerMother.random()
        account = AccountMother.with_zero_balance_and_customer_id(customer.id)
        amount = 500

        self.given_a_make_deposit_use_case()
        self.and_existing_customer(customer)
        self.and_existing_account(account)

        self.when_make_a_deposit(account.id, customer.id, amount)

        self.then_the_account_balance_is(account.id, amount)
        self.then_a_deposit_was_made_event_was_register(account.id, amount)

    def given_a_make_deposit_use_case(self):
        self.account_repository = InMemoryAccountRepository()
        self.customer_repository = InMemoryCustomerRepository()
        self.event_bus = create_autospec(EventBus)
        self.make_deposit = MakeDeposit(self.account_repository, self.customer_repository, self.event_bus)

    def and_existing_customer(self, customer: Customer):
        self.customer_repository.store(customer)

    def and_existing_account(self, account: Account):
        self.account_repository.store(account)

    def when_make_a_deposit(self, account_id: AccountId, customer_id: CustomerId, amount: float):
        self.make_deposit(account_id, customer_id, amount)

    def then_the_account_balance_is(self, account_id, balance: float):
        account = self.account_repository.find_by_id(account_id)
        assert_that(account, not_none())
        assert_that(account.id, equal_to(account_id))
        assert_that(account.balance, equal_to(balance))

    def then_a_deposit_was_made_event_was_register(self, account_id: AccountId, amount: float):
        events = self.event_bus.publish.call_args[0][0]
        assert_that(len(events), equal_to(1))
        assert_that(events[0].body(), equal_to({
            'accountId': account_id.value,
            'amount': amount
        }))


if __name__ == '__main__':
    unittest.main()
