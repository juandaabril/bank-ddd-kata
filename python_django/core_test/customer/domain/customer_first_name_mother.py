from core.customer.domain.customer_first_name import CustomerFirstName

ANY_FIRST_NAME = 'any_name'


class CustomerFirstNameMother:
    @staticmethod
    def random() -> CustomerFirstName:
        return CustomerFirstName(ANY_FIRST_NAME)
