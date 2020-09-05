import {DateTimeFormatter, LocalDate} from "@js-joda/core";
import {ValueObject} from "./ValueObject";

const FORMATTER =  DateTimeFormatter.ofPattern('dd/MM/yyyy');

export class DateValueObject extends ValueObject<LocalDate>{

    equals(date: DateValueObject): boolean {
        return this.value.equals(date.value);
    }

    format(): string {
        return this.value.format(FORMATTER);
    }

    static fromString(date: string): DateValueObject {
        const localDate = LocalDate.parse(date, FORMATTER);

        return new DateValueObject(localDate);
    }
}
