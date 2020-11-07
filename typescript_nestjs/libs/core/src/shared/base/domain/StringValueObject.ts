import {ValueObject} from "./ValueObject";

export class StringValueObject implements ValueObject {
    private _value: string;

    constructor(value: string) {
        this._value = value;
    }

    equals(object: any): boolean {
        if (object instanceof  StringValueObject) {
            return  this._value === object._value
        }
        return false;
    }

    get value(): string {
        return this._value;
    }

    toString(): string {
        return `Value:${this._value}`;
    }
}
