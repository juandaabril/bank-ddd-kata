import unittest

from hamcrest import *

from core.shared.domain.string_value_object import StringValueObject

ANY_STRING = 'ANY_STRING'


class TestStringValueObject(unittest.TestCase):
    def test_should_create_a_string_value_object(self):
        string_value_object = StringValueObject(ANY_STRING)
        assert_that(string_value_object, not_none())
        assert_that(string_value_object.value, equal_to(ANY_STRING))

    def test_should_two_value_object_are_equal_with_the_same_value(self):
        string_value_object_a = StringValueObject(ANY_STRING)
        string_value_object_b = StringValueObject(ANY_STRING)
        assert_that(string_value_object_a, equal_to(string_value_object_b))


if __name__ == '__main__':
    unittest.main()
