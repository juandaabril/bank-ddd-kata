from core.customer.domain.customer_name import CustomerName

ANY_NAME = 'any_name'


class CustomerNameMother:
    @staticmethod
    def random() -> CustomerName:
        return CustomerName(ANY_NAME)
