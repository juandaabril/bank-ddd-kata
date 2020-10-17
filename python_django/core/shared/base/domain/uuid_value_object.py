import uuid

from core.shared.base.domain.string_value_object import StringValueObject


class UUIDValueObject(StringValueObject):
    def __init__(self, value: str):
        super().__init__(value)
        try:
            uuid.UUID(self._value, version=4)
        except ValueError:
            raise InvalidUUID()


class InvalidUUID(Exception):
    pass
