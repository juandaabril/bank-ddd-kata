import {TransactionDate} from "./TransactionDate";
import {Amount} from "./Amount";
import {Description} from "./Description";

export class Debit {
    private _description: Description;
    private _amount: Amount;
    private _transactionDate: TransactionDate;


    constructor(description: Description, amount: Amount, transactionDate: TransactionDate) {
        this._description = description;
        this._amount = amount;
        this._transactionDate = transactionDate;
    }

    static create(description: Description, amount: Amount, transactionDate: TransactionDate): Debit {
        return new Debit(
            description,
            amount,
            transactionDate
        );
    }

    get description(): Description {
        return this._description;
    }

    get amount(): Amount {
        return this._amount;
    }

    get transactionDate(): TransactionDate {
        return this._transactionDate;
    }
}
