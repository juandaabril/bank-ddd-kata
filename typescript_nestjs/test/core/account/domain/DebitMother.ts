import {Debit} from "../../../../src/core/account/domain/Debit";
import {Amount} from "../../../../src/core/account/domain/Amount";
import {DescriptionMother} from "./DescriptionMother";
import {DateValueObjectMother} from "../../shared/domain/DateValueObjectMother";
import {AccountOpeningDate} from "../../../../src/core/account/domain/AccountOpeningDate";

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

