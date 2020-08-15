import {DateValueObject} from "../../shared/domain/DateValueObject";

export class TransactionDate extends DateValueObject {
    static fromDate(date: DateValueObject): TransactionDate {
        return new TransactionDate(date.value);
    }
}
