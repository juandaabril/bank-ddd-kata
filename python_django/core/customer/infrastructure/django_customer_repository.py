from typing import List
from django.db import models

from core.customer.domain.customer import Customer
from core.customer.domain.customer_id import CustomerId
from core.customer.domain.customer_first_name import CustomerFirstName
from core.customer.domain.customer_repository import CustomerRepository


class DjangoCustomerRepository(CustomerRepository):
    def find_by_id(self, customer_id: CustomerId) -> Customer:
        result = CustomerModel.objects.filter(id=customer_id.value)
        result = _models_to_domain(result)
        if len(result) == 0:
            return None

        return result[0]

    def store(self, customer: Customer) -> None:
        model = _domain_to_model(customer)
        model.save()

    def find_all(self) -> List[Customer]:
        result = _models_to_domain(CustomerModel.objects.all())

        return result


class CustomerModel(models.Model):
    class Meta:
        db_table = 'customer'

    id = models.UUIDField(primary_key=True, editable=False)
    first_name = models.CharField(max_length=30)


def _models_to_domain(model_list) -> List[Customer]:
    def mapper(model):
        return Customer(
            CustomerId(str(model.id)),
            CustomerFirstName(model.first_name)
        )

    return list(map(mapper, list(model_list)))


def _domain_to_model(customer: Customer) -> models.Model:
    model = CustomerModel(
        id=customer.id.value,
        first_name=customer.first_name.value
    )
    return model
