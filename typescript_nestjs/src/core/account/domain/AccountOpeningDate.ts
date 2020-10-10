import {DateValueObject} from "../../shared/domain/DateValueObject";

export class AccountOpeningDate extends DateValueObject {

    static fromDate(date: DateValueObject): AccountOpeningDate {
        return new AccountOpeningDate(date.value);
    }

}
