import {Body, Controller, Post, Put} from '@nestjs/common';
import {RegisterANewAccount} from "../../../core/account/application/RegisterANewAccount";
import {AccountId} from "../../../core/account/domain/AccountId";
import {CustomerId} from "../../../core/customer/domain/CustomerId";
import {DepositFundsIntoAccount} from "../../../core/account/application/DepositFundsIntoAccount";
import {Description} from "../../../core/account/domain/Description";
import {Amount} from "../../../core/account/domain/Amount";

export class Request {
    accountId: string;
    customerId: string;
    description: string;
    amount: number;
}

@Controller('/account/deposit')
export class AccountDepositPutController {
    constructor(
        private depositFundsIntoAccount: DepositFundsIntoAccount
    ) {
    }

    @Put()
    run(@Body() request: Request): Promise<void> {
        const accountId = new AccountId(request.accountId);
        const customerId = new CustomerId(request.customerId);
        const description = new Description(request.description);
        const amount = new Amount(request.amount);

        return this.depositFundsIntoAccount.execute(
            accountId,
            customerId,
            description,
            amount
        );
    }
}

