from core.customer.domain.customer import Customer
from core_test.customer.domain.customer_id_mother import CustomerIdMother
from core_test.customer.domain.customer_name_mother import CustomerNameMother


class CustomerMother:
    @staticmethod
    def random() -> Customer:
        customer_id = CustomerIdMother.random()
        customer_name = CustomerNameMother.random()

        return Customer(customer_id, customer_name)
