import unittest

from hamcrest import *

from core.account.application.create_account import CreateAccount
from core.account.domain.account_repository import AccountRepository
from core.account.infrastructure.in_memory_account_repository import InMemoryAccountRepository
from core.customer.domain.customer_repository import CustomerRepository
from core.customer.domain.exceptions import CustomerNotFound
from core.customer.infrastructure.in_memory_customer_repository import InMemoryCustomerRepository
from core_test.account.domain.accont_id_mother import AccountIdMother
from core_test.customer.domain.customer_id_mother import CustomerIdMother
from core_test.customer.domain.customer_mother import CustomerMother


class TestCreateAccount(unittest.TestCase):
    account_repository: AccountRepository
    customer_repository: CustomerRepository
    create_account: CreateAccount

    def test_should_create_an_account(self):
        customer = CustomerMother.random()
        account_id = AccountIdMother.random()

        self.given_a_create_account_use_case()
        self.and_existing_customer(customer)

        self.when_create_an_account(account_id, customer.id)

        self.then_the_account_is_created(account_id, customer.id)

    def test_should_validate_if_the_client_exists(self):
        no_existing_customer_id = CustomerIdMother.random()
        account_id = AccountIdMother.random()

        self.given_a_create_account_use_case()

        self.assertRaises(CustomerNotFound,
                          lambda: self.when_create_an_account(account_id, no_existing_customer_id))

    def given_a_create_account_use_case(self):
        self.account_repository = InMemoryAccountRepository()
        self.customer_repository = InMemoryCustomerRepository()
        self.create_account = CreateAccount(self.account_repository, self.customer_repository)

    def and_existing_customer(self, customer):
        self.customer_repository.store(customer)

    def when_create_an_account(self, account_id, customer_id):
        self.create_account(account_id, customer_id)

    def then_the_account_is_created(self, account_id, customer_id):
        account = self.account_repository.find_by_id(account_id)
        assert_that(account, not_none())
        assert_that(account.id, equal_to(account_id))
        assert_that(account.customer_id, equal_to(customer_id))


if __name__ == '__main__':
    unittest.main()
