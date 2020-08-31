import {Debit} from "../../../../src/core/account/domain/Debit";
import {Amount} from "../../../../src/core/account/domain/Amount";
import {TransactionDate} from "../../../../src/core/account/domain/TransactionDate";
import {Description} from "../../../../src/core/account/domain/Description";

export class DebitMother {

    static withThisValue(value: number): Debit {
        return new Debit(
            new Description('any description'),
            new Amount(value),
            new TransactionDate('01/01/2020')
        );
    }
}
