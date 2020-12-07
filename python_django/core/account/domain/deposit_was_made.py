from core.shared.bus.domain.domain_event import DomainEvent


class DepositWasMade(DomainEvent):
    _account_id: str
    _amount: float

    def __init__(self, account_id: str, amount: float):
        super().__init__()
        self._account_id = account_id
        self._amount = amount

    def body(self) -> dict:
        return {
            'accountId': self._account_id,
            'amount': self._amount
        }
