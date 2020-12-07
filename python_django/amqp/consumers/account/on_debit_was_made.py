from amqp.events.event_pattern_decorator import EventPattern
from core.account.domain.accont_id import AccountId
from core.customer.domain.customer_id import CustomerId
from core.shared.base.domain.uuid_value_object import UUIDValueObject


@EventPattern('DepositWasMade')
def on_customer_was_created(event, provider):
    print(event)
    create_account = provider.create_account

    account_id = AccountId(UUIDValueObject.random())
    customer_id = CustomerId(event['body']['customerId'])

    create_account(account_id, customer_id)


