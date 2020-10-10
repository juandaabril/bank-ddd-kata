import unittest

from hamcrest import *

from core.customer.application.create_customer import CreateCustomer
from core.customer.domain.customer_repository import CustomerRepository
from core.customer.infrastructure.in_memory_customer_repository import InMemoryCustomerRepository
from core_test.customer.domain.customer_id_mother import CustomerIdMother
from core_test.customer.domain.customer_name_mother import CustomerNameMother


class TestCreateCustomer(unittest.TestCase):
    create_customer: CreateCustomer
    customer_repository: CustomerRepository

    def test_should_create_a_customer(self):
        customer_id = CustomerIdMother.random()
        customer_name = CustomerNameMother.random()

        self.given_a_create_customer_use_case()

        self.when_create_a_customer(customer_id, customer_name)

        self.then_customer_has_this_data(customer_id, customer_name)

    def given_a_create_customer_use_case(self):
        self.customer_repository = InMemoryCustomerRepository()
        self.create_customer = CreateCustomer(self.customer_repository)

    def when_create_a_customer(self, customer_id, customer_name):
        self.create_customer(customer_id, customer_name)

    def then_customer_has_this_data(self, customer_id, customer_name):
        customer = self.customer_repository.find_by_id(customer_id)
        assert_that(customer, not_none())
        assert_that(customer.id, not_none())
        assert_that(customer.id, equal_to(customer_id))
        assert_that(customer.name, equal_to(customer_name))


if __name__ == '__main__':
    unittest.main()
