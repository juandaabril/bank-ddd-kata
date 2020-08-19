import {DateTimeFormatter, LocalDate} from "@js-joda/core";

const FORMATTER =  DateTimeFormatter.ofPattern('dd/MM/yyyy');

export class DateValueObject {

    private _value: LocalDate;

    constructor(value: string) {
        this._value = LocalDate.parse(value, FORMATTER);
    }

    get value(): string {
        return this._value.format(FORMATTER);
    }
}
