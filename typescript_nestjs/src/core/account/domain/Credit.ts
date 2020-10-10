import {TransactionDate} from "./TransactionDate";
import {Amount} from "./Amount";
import {Description} from "./Description";
import {Transaction} from "./Transaction";

export class Credit extends Transaction {

    static create(description: Description, amount: Amount, transactionDate: TransactionDate) {
        return new Credit(
            description,
            amount,
            transactionDate
        );
    }
}