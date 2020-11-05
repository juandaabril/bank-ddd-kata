import {DateTimeFormatter, LocalDate} from "@js-joda/core";
import {ValueObject} from "./ValueObject";

const FORMATTER =  DateTimeFormatter.ofPattern('dd/MM/yyyy');

export class DateValueObject implements ValueObject {

    private _value: LocalDate;

    constructor(date: LocalDate) {
        this._value = date;
    }

    static fromString(date: string): DateValueObject {
        const localDate = LocalDate.parse(date, FORMATTER);

        return new DateValueObject(localDate);
    }
    equals(object: any): boolean {
        if (object instanceof  DateValueObject) {
            return this._value.equals(object.value);
        }
        return false;
    }

    get value(): LocalDate {
        return this._value;
    }

    format(): string {
        return this.value.format(FORMATTER);
    }

    toString(): string {
        return `Value:${this._value}`;
    }
}
