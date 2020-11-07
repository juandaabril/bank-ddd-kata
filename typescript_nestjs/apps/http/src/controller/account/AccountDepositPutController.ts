import { Body, Controller, Post, Put } from '@nestjs/common';
import { AccountId } from '@app/core/account/domain/AccountId';
import { CustomerId } from '@app/core/customer/domain/CustomerId';
import { DepositFundsIntoAccount } from '@app/core/account/application/DepositFundsIntoAccount';
import { Description } from '@app/core/transaction/domain/Description';
import { MoneyValueObject } from '@app/core/shared/base/domain/MoneyValueObject';

export class Request {
    accountId: string;
    customerId: string;
    description: string;
    amount: number;
}

@Controller('/account/deposit')
export class AccountDepositPutController {
    constructor(
        private depositFundsIntoAccount: DepositFundsIntoAccount,
    ) {
    }

    @Put()
    run(@Body() request: Request): Promise<void> {
        const accountId = new AccountId(request.accountId);
        const customerId = new CustomerId(request.customerId);
        const description = new Description(request.description);
        const amount = new MoneyValueObject(request.amount);

        return this.depositFundsIntoAccount.execute(
            accountId,
            customerId,
            description,
            amount,
        );
    }
}

