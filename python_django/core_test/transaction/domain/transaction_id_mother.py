from core.customer.domain.customer_id import CustomerId
from core_test.shared.base.domain.uuid_mother import UUIDMother


class TransactionIdMother:

    @staticmethod
    def random() -> CustomerId:
        random_uuid = UUIDMother.random().value
        return CustomerId(random_uuid)
