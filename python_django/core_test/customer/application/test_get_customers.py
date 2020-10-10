import unittest

from hamcrest import *

from core.customer.application.get_customers import GetCustomers
from core.customer.domain.customer_repository import CustomerRepository
from core.customer.infrastructure.in_memory_customer_repository import InMemoryCustomerRepository
from core_test.customer.domain.customer_mother import CustomerMother


class TestGetCustomers(unittest.TestCase):
    customer_repository: CustomerRepository
    get_customers: GetCustomers

    def test_should_get_all_the_customers(self):
        customer = CustomerMother.random()

        self.given_a_get_customer_use_case()
        self.and_a_customer_with_this_info(customer)

        response = self.when_get_all_the_customers()

        self.then_the_result_has_this_data(response)

    def given_a_get_customer_use_case(self):
        self.customer_repository = InMemoryCustomerRepository()
        self.get_customers = GetCustomers(self.customer_repository)

    def and_a_customer_with_this_info(self, customer):
        self.customer_repository.store(customer)

    def when_get_all_the_customers(self):
        response = self.get_customers()
        return response

    def then_the_result_has_this_data(self, response):
        assert_that(response, not_none())
        assert_that(len(response), equal_to(1))


if __name__ == '__main__':
    unittest.main()
