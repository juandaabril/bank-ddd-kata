import * as validate from 'uuid-validate';
import {RuntimeError} from "./RuntimeError";
import {ValueObject} from "./ValueObject";

export class UuidValueObject extends ValueObject<string> {

    constructor(value: string) {
        super(value);
        this.ensureIsValidUuid(value);
    }

    private ensureIsValidUuid(id: string): void {
        if (!validate(id, 4)) {
            throw new InvalidUuidError(`<${id}> is an invalid UUID <${this.constructor.name}>`);
        }
    }
}

export class InvalidUuidError extends RuntimeError {
}
