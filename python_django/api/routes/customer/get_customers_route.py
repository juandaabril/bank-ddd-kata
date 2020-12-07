from rest_framework import serializers, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from core.customer.application.get_customers import CustomerResponse


@api_view(['GET'])
def get_customer_route(request):
    get_customers = request.provider.get_customers
    result = get_customers()

    serializer = CustomerResponseSerializer(result, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


class CustomerResponseSerializer(serializers.BaseSerializer):
    def to_representation(self, instance: CustomerResponse):
        return {
            'id': instance.id,
            'name': instance.name
        }

