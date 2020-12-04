import unittest

from hamcrest import *

from core.customer.domain.customer_first_name import CustomerFirstName

ANY_CUSTOMER_FIRST_NAME = 'Jhon'


class TestCustomerName(unittest.TestCase):
    def test_should_create_a_customer_name(self):
        customer_first_name = CustomerFirstName(ANY_CUSTOMER_FIRST_NAME)
        assert_that(customer_first_name, not_none())
        assert_that(customer_first_name.value, equal_to(ANY_CUSTOMER_FIRST_NAME))


if __name__ == '__main__':
    unittest.main()
