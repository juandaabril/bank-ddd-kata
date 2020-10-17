import uuid

from core.shared.base.domain.uuid_value_object import UUIDValueObject


class UUIDMother:
    @staticmethod
    def random() -> UUIDValueObject:
        random_uuid = str(uuid.uuid4())
        return UUIDValueObject(random_uuid)
