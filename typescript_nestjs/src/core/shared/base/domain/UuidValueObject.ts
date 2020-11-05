import * as validate from 'uuid-validate';
import {StringValueObject} from "./StringValueObject";
import {RuntimeError} from "./RuntimeError";

export class UuidValueObject extends StringValueObject {

    constructor(value: string) {
        super(value);
        this.ensureValidUuid(value);
    }

    private ensureValidUuid(id: string): void {
        if (!validate(id, 4)) {
            throw new InvalidUuidError(`<${id}> is an invalid UUID <${this.constructor.name}>`);
        }
    }
}

export class InvalidUuidError extends RuntimeError {
}
