import {DateService} from "../domain/DateService";
import {DateValueObject} from "../domain/DateValueObject";

export class LocalDateService implements DateService {
    today(): Promise<DateValueObject> {
        return Promise.resolve(new DateValueObject('01/02/2010'));
    }
}
