from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from core.account.domain.accont_id import AccountId
from core.customer.domain.customer_id import CustomerId


@api_view(['POST'])
def make_deposit_route(request):
    make_deposit = request.provider.make_deposit
    account_id = AccountId(request.data['accountId'])
    customer_id = CustomerId(request.data['customerId'])
    amount = request.data['amount']

    make_deposit(account_id, customer_id, amount)

    return Response(status=status.HTTP_200_OK)