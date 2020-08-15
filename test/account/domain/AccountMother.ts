import {Account} from "../../../src/account/domain/Account";
import {AccountIdMother} from "./AccountIdMother";
import {CustomerIdMother} from "../../customer/domain/CustomerIdMother";
import {DateValueObjectMother} from "../../shared/domain/DateValueObjectMother";
import {DebitMother} from "./DebitMother";
import {AccountStatus} from "../../../src/account/domain/AccountStatus";

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
}
