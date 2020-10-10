import unittest

from hamcrest import *

from core.customer.domain.customer_name import CustomerName

ANY_CUSTOMER_NAME = 'Jhon'


class TestCustomerName(unittest.TestCase):
    def test_should_create_a_customer_name(self):
        customer_name = CustomerName(ANY_CUSTOMER_NAME)
        assert_that(customer_name, not_none())
        assert_that(customer_name.value, equal_to(ANY_CUSTOMER_NAME))


if __name__ == '__main__':
    unittest.main()
