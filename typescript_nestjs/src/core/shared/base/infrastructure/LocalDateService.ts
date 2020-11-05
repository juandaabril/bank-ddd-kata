import {DateService} from "../domain/DateService";
import {DateValueObject} from "../domain/DateValueObject";
import {LocalDate} from "@js-joda/core";

export class LocalDateService implements DateService {
    today(): Promise<DateValueObject> {
        return Promise.resolve(new DateValueObject(LocalDate.now()));
    }
}
