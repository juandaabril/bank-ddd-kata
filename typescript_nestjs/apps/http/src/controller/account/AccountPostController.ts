import { Body, Controller, Post } from '@nestjs/common';
import { RegisterNewAccount } from '@app/core/account/application/RegisterNewAccount';
import { AccountId } from '@app/core/account/domain/AccountId';
import { CustomerId } from '@app/core/customer/domain/CustomerId';

export class Request {
    accountId: string;
    customerId: string;
}

@Controller('/account')
export class AccountPostController {
    constructor(
        private registerANewAccount: RegisterNewAccount,
    ) {
    }

    @Post()
    run(@Body() request: Request): Promise<void> {
        const accountId = new AccountId(request.accountId);
        const customerId = new CustomerId(request.customerId);

        return this.registerANewAccount.execute(
            accountId,
            customerId,
        );
    }
}

