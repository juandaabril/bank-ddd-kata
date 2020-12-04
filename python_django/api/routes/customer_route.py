from rest_framework import status, serializers
from rest_framework.response import Response
from rest_framework.views import APIView

from core.customer.application.create_customer import CreateCustomer
from core.customer.application.get_customers import GetCustomers, CustomerResponse
from core.customer.domain.customer_id import CustomerId
from core.customer.domain.customer_first_name import CustomerFirstName


class CustomerResponseSerializer(serializers.BaseSerializer):
    def to_representation(self, instance: CustomerResponse):
        return {
            'id': instance.id,
            'name': instance.name
        }


class CustomerRoute(APIView):

    def get(self, request):
        get_customers: GetCustomers = request.provider.get_customer

        result = get_customers()

        serializer = CustomerResponseSerializer(result, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        create_customer: CreateCustomer = request.provider.create_customer
        customer_id = CustomerId(request.data['customerId'])
        customer_name = CustomerFirstName(request.data['firstName'])

        create_customer(customer_id, customer_name)

        return Response(status=status.HTTP_201_CREATED)
