from typing import List
from django.db import models
from core.account.domain.accont_id import AccountId
from core.account.domain.account import Account
from core.account.domain.account_repository import AccountRepository
from core.customer.domain.customer_id import CustomerId


class DjangoAccountRepository(AccountRepository):
    def find_by_id(self, account_id: AccountId) -> Account:
        result = _models_to_domain(AccountModel.objects.filter(id=account_id.value))
        if len(result) == 0:
            return None

        return result[0]

    def store(self, account: Account) -> None:
        model = _domain_to_model(account)
        model.save()


class AccountModel(models.Model):
    class Meta:
        db_table = 'account'

    id = models.UUIDField(primary_key=True, editable=False)
    customer_id = models.UUIDField()
    balance = models.BigIntegerField()


def _models_to_domain(model_list: List) -> List[Account]:
    def mapper(model):
        return Account(
            AccountId(str(model.id)),
            CustomerId(str(model.customer_id)),
            model.balance
        )

    return map(mapper, model_list)


def _domain_to_model(account: Account) -> models.Model:
    model = AccountModel(
        id=account.id.value,
        customer_id=account.customer_id.value,
        balance=account.balance
    )
    return model
