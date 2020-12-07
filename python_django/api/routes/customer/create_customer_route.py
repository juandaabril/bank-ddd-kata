from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from core.customer.domain.customer_first_name import CustomerFirstName
from core.customer.domain.customer_id import CustomerId


@api_view(['POST'])
def create_customer_route(request):
    create_customer = request.provider.create_customer
    customer_id = CustomerId(request.data['customerId'])
    customer_name = CustomerFirstName(request.data['firstName'])

    create_customer(customer_id, customer_name)

    return Response(status=status.HTTP_201_CREATED)
