import uuid

from core.customer.domain.customer_id import CustomerId
from core_test.shared.domain.uuid_mother import UUIDMother


class CustomerIdMother:

    @staticmethod
    def random() -> CustomerId:
        random_uuid = UUIDMother.random().value
        return CustomerId(random_uuid)
