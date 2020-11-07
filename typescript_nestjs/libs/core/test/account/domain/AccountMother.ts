import { Account } from '@app/core/account/domain/Account';
import { AccountIdMother } from './AccountIdMother';
import { CustomerIdMother } from '../../customer/domain/CustomerIdMother';
import { DateValueObjectMother } from '../../shared/base/domain/DateValueObjectMother';
import { AccountStatus } from '@app/core/account/domain/AccountStatus';
import { AccountId } from '@app/core/account/domain/AccountId';
import { CustomerId } from '@app/core/customer/domain/CustomerId';
import { MoneyValueObject } from '@app/core/shared/base/domain/MoneyValueObject';
import { DateValueObject } from '@app/core/shared/base/domain/DateValueObject';

type Options = {
    accountId?: CustomerId,
    customerId?: AccountId,
    status?: AccountStatus,
    openingDate?: DateValueObject,
    balance?: MoneyValueObject
};

const DEFAULT_OPTIONS: Options = {
    accountId: AccountIdMother.random(),
    customerId: CustomerIdMother.random(),
    status: AccountStatus.OPEN,
    openingDate: DateValueObjectMother.random(),
    balance: new MoneyValueObject(0),
};

export class AccountMother {

    static withZeroBalance(): Account {
        return new Account(
            AccountIdMother.random(),
            CustomerIdMother.random(),
            AccountStatus.OPEN,
            DateValueObjectMother.random(),
            new MoneyValueObject(0),
        );
    }

    static withThisBalance(balance: MoneyValueObject) {
        return new Account(
            AccountIdMother.random(),
            CustomerIdMother.random(),
            AccountStatus.OPEN,
            DateValueObjectMother.random(),
            balance,
        );
    }

    static with(param: Options) {
        const options = {
            ...DEFAULT_OPTIONS,
            ...param,
        };

        return new Account(
            options.accountId,
            options.customerId,
            options.status,
            options.openingDate,
            options.balance,
        );
    }
}


