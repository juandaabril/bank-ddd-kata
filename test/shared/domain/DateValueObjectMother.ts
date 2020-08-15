import {DateValueObject} from "../../../src/shared/domain/DateValueObject";

export class DateValueObjectMother {
    static random(): DateValueObject {
        return new DateValueObject('01/01/2020');
    }
}
