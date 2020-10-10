import {Account} from "../../../../src/core/account/domain/Account";
import {AccountIdMother} from "./AccountIdMother";
import {CustomerIdMother} from "../../customer/domain/CustomerIdMother";
import {DateValueObjectMother} from "../../shared/domain/DateValueObjectMother";
import {DebitMother} from "./DebitMother";
import {AccountStatus} from "../../../../src/core/account/domain/AccountStatus";
import {AccountId} from "../../../../src/core/account/domain/AccountId";
import {CustomerId} from "../../../../src/core/customer/domain/CustomerId";
import {AccountOpeningDate} from "../../../../src/core/account/domain/AccountOpeningDate";
import {Debit} from "../../../../src/core/account/domain/Debit";
import {Credit} from "../../../../src/core/account/domain/Credit";

const DEFAULT_OPTIONS: Options = {
    accountId: AccountIdMother.random(),
    customerId: CustomerIdMother.random(),
    status: AccountStatus.OPEN,
    openingDate: DateValueObjectMother.random(),
    debits: [],
    credits: []
};


export class AccountMother {

    static withZeroBalance(): Account {
        return new Account(
            AccountIdMother.random(),
            CustomerIdMother.random(),
            AccountStatus.OPEN,
            DateValueObjectMother.random(),
            [],
            []
        );
    }

    static withThisDebit(value: number) {
        return new Account(
            AccountIdMother.random(),
            CustomerIdMother.random(),
            AccountStatus.OPEN,
            DateValueObjectMother.random(),
            [DebitMother.withThisValue(value)],
            []
        );

    }

    static with(param: Options) {
        const options = {
            ...DEFAULT_OPTIONS,
            ...param
        };

        return new Account(
            options.accountId,
            options.customerId,
            options.status,
            options.openingDate,
            options.debits,
            options.credits
        );
    }
}


type Options = {
    accountId?: CustomerId,
    customerId?: AccountId,
    status?: AccountStatus,
    openingDate?: AccountOpeningDate,
    debits?: Debit[],
    credits?: Credit[]
};
