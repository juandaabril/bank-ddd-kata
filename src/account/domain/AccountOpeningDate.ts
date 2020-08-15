import {DateValueObject} from "../../shared/domain/DateValueObject";

export class AccountOpeningDate extends DateValueObject {

    static fromSimpleDate(date: DateValueObject): AccountOpeningDate {
        return new AccountOpeningDate(date.value);
    }

}
