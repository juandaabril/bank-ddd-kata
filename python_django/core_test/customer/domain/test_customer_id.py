from hamcrest import *
import uuid
import unittest

from core.customer.domain.customer_id import CustomerId


class TestCustomerId(unittest.TestCase):
    def test_should_create_a_customer_id(self):
        random_uuid = str(uuid.uuid4())

        customer_id = CustomerId(random_uuid)

        assert_that(customer_id, not_none())


if __name__ == '__main__':
    unittest.main()
