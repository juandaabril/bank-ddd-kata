from core.shared.base.domain.string_value_object import StringValueObject


class TransactionType(StringValueObject):
    def __init__(self, value: str):
        super().__init__(value)