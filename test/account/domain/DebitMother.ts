import {Debit} from "../../../src/account/domain/Debit";
import {Amount} from "../../../src/account/domain/Amount";
import {TransactionDate} from "../../../src/account/domain/TransactionDate";
import {Description} from "../../../src/account/domain/Description";

export class DebitMother {

    static withThisValue(value: number): Debit {
        return new Debit(
            new Description('any description'),
            new Amount(value),
            new TransactionDate('01/01/2020')
        );
    }
}
