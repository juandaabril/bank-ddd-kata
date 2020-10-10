import {TransactionDate} from "./TransactionDate";
import {Amount} from "./Amount";
import {Description} from "./Description";
import {Transaction} from "./Transaction";

export class Debit extends Transaction {

    static create(description: Description, amount: Amount, transactionDate: TransactionDate): Debit {
        return new Debit(
            description,
            amount,
            transactionDate
        );
    }

}
