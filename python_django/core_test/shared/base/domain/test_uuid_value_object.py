import unittest
import uuid

from hamcrest import *

from core.shared.base.domain.uuid_value_object import UUIDValueObject, InvalidUUID

ANY_STRING = 'ANY_STRING'


class TestUUIDValueObject(unittest.TestCase):
    def test_should_create_a_uuid_id(self):
        random_uuid = str(uuid.uuid4())

        customer_id = UUIDValueObject(random_uuid)

        assert_that(customer_id, not_none())

    def test_should_validate_the_uuid(self):
        random_uuid = 'invalid_uuid'

        self.assertRaises(InvalidUUID, lambda: UUIDValueObject(random_uuid))


if __name__ == '__main__':
    unittest.main()
