import {Controller, Get, Param} from '@nestjs/common';
import {CustomerId} from "../../../core/customer/domain/CustomerId";
import {AccountDetails, GetAccountDetails} from "../../../core/account/infrastructure/GetAccountDetails";
import {AccountId} from "../../../core/account/domain/AccountId";

@Controller('/account')
export class AccountGetController {
    constructor(
        private getAccountDetails: GetAccountDetails
    ) {
    }

    @Get(':accountId/customer/:customerId')
    run(@Param() params): Promise<AccountDetails> {
        const accountId = new AccountId(params.accountId);
        const customerId = new CustomerId(params.customerId);

        return this.getAccountDetails.execute(
            accountId,
            customerId
        );
    }
}

