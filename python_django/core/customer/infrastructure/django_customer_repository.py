from typing import List
from django.db import models

from core.customer.domain.customer import Customer
from core.customer.domain.customer_id import CustomerId
from core.customer.domain.customer_name import CustomerName
from core.customer.domain.customer_repository import CustomerRepository


class CustomerModel(models.Model):
    class Meta:
        db_table = 'customer'

    id = models.UUIDField(primary_key=True, editable=False)
    name = models.CharField(max_length=30)


class DjangoCustomerRepository(CustomerRepository):
    def find_by_id(self, customer_id: CustomerId) -> Customer:
        result = self._mapToDomain(CustomerModel.objects.filter(id=1))
        if len(result) == 0:
            return None

        return result[0]

    def store(self, customer: Customer) -> None:
        model = CustomerModel(
            id=customer.id.value,
            name=customer.name.value
        )

        model.save()

    def find_all(self) -> List[Customer]:
        result = self._mapToDomain(list(CustomerModel.objects.all()))

        return result

    def _mapToDomain(self, models: List) -> List[Customer]:
        print(models)
        def mapper(model):
            return Customer(
                CustomerId(str(model.id)),
                CustomerName(model.name)
            )

        return map(mapper, models)
