import {Description} from "./Description";
import { DateValueObject } from '../../shared/base/domain/DateValueObject';
import { MoneyValueObject } from '../../shared/base/domain/MoneyValueObject';

export class Transaction {
    private _description: Description;
    private _amount: MoneyValueObject;
    private _transactionDate: DateValueObject;

    constructor(description: Description, amount: MoneyValueObject, transactionDate: DateValueObject) {
        this._transactionDate = transactionDate;
        this._amount = amount;
        this._description = description;
    }

    get transactionDate(): DateValueObject {
        return this._transactionDate;
    }

    get amount(): MoneyValueObject {
        return this._amount;
    }

    get description(): Description {
        return this._description;
    }
}
