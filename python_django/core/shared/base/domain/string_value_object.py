class StringValueObject:
    _value: str

    def __init__(self, value):
        self._value = value

    @property
    def value(self) -> str:
        return self._value

    def __eq__(self, other):
        if isinstance(other, StringValueObject):
            return self._value == other._value
        return False
