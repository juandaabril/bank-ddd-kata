import {TransactionDate} from "./TransactionDate";
import {Amount} from "./Amount";
import {Description} from "./Description";

export class Transaction {
    private _description: Description;
    private _amount: Amount;
    private _transactionDate: TransactionDate;

    constructor(description: Description, amount: Amount, transactionDate: TransactionDate) {
        this._transactionDate = transactionDate;
        this._amount = amount;
        this._description = description;
    }

    get transactionDate(): TransactionDate {
        return this._transactionDate;
    }

    get amount(): Amount {
        return this._amount;
    }

    get description(): Description {
        return this._description;
    }
}
