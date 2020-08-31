import {Body, Controller, Post} from '@nestjs/common';
import {RegisterANewAccount} from "../../../core/account/application/RegisterANewAccount";
import {AccountId} from "../../../core/account/domain/AccountId";
import {CustomerId} from "../../../core/customer/domain/CustomerId";

export class Request {
    accountId: string;
    customerId: string;
}

@Controller('/account')
export class AccountPostController {
    constructor(
        private registerANewAccount: RegisterANewAccount
    ) {
    }

    @Post()
    run(@Body() request: Request): Promise<void> {
        const accountId = new AccountId(request.accountId);
        const customerId = new CustomerId(request.customerId);

        return this.registerANewAccount.execute(
            accountId,
            customerId
        );
    }
}

