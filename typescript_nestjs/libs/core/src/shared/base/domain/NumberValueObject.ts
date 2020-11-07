import { ValueObject } from './ValueObject';

export class NumberValueObject implements ValueObject {
    private _value: number;

    constructor(value: number) {
        this._value = value;
    }

    equals(object: any): boolean {
        if (object instanceof NumberValueObject) {
            return this._value === object._value;
        }
        return false;
    }

    get value(): number {
        return this._value;
    }

    toString(): string {
        return `Value:${this._value}`;
    }
}
