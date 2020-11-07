import {Debit} from "../../../../../libs/core/src/transaction/domain/Debit";
import {Amount} from "../../../../../libs/core/src/account/domain/Amount";
import {DescriptionMother} from "./DescriptionMother";
import {DateValueObjectMother} from "../../shared/base/domain/DateValueObjectMother";
import {AccountOpeningDate} from "../../../../../libs/core/src/account/domain/AccountOpeningDate";

export class DebitMother {

    static withThisValue(value: number): Debit {
        return new Debit(
            DescriptionMother.random(),
            new Amount(value),
            AccountOpeningDate.fromDate(
                DateValueObjectMother.random()
            )
        );
    }
}

