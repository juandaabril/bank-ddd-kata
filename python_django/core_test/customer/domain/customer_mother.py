from core.customer.domain.customer import Customer
from core_test.customer.domain.customer_id_mother import CustomerIdMother
from core_test.customer.domain.customer_first_name_mother import CustomerFirstNameMother


class CustomerMother:
    @staticmethod
    def random() -> Customer:
        customer_id = CustomerIdMother.random()
        customer_name = CustomerFirstNameMother.random()

        return Customer(customer_id, customer_name)
