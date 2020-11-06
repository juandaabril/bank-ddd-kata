import { Body, Controller, HttpStatus, Put } from '@nestjs/common';
import { AccountId } from '../../../core/account/domain/AccountId';
import { CustomerId } from '../../../core/customer/domain/CustomerId';
import { CloseAccount } from '../../../core/account/application/CloseAccount';
import {
    setErrorHandling,
} from '../../filters/HttpExceptionFilter';
import { AccountCannotBeClosedWithExistingFunds } from '../../../core/account/domain/Account';

export class Request {
    accountId: string;
    customerId: string;
}


@Controller('/account/close')
@setErrorHandling([
    {
        type: AccountCannotBeClosedWithExistingFunds,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: 'AccountCannotBeClosedWithExistingFunds',
    },
])
export class AccountClosePutController {
    constructor(
        private closeAccount: CloseAccount,
    ) {
    }

    @Put()
    run(@Body() request: Request): Promise<void> {
        const accountId = new AccountId(request.accountId);
        const customerId = new CustomerId(request.customerId);

        return this.closeAccount.execute(
            accountId,
            customerId,
        );
    }
}

