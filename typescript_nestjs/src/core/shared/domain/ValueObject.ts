export abstract class ValueObject<V extends any> {
    private _value: V;

    constructor(value: V) {
        this._value = value;
    }

    get value(): V {
        return this._value;
    }

    equals(o: ValueObject<V>): boolean {
        return this._value === o.value;
    }

    toString() {
        return `Value:${this._value}`;
    }
}

