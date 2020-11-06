import {StringValueObject} from "../../shared/base/domain/StringValueObject";
import { RuntimeError } from '../../shared/base/domain/RuntimeError';

export class CustomerIdentification extends StringValueObject {

    constructor(value: string) {
        super(value);
        this.ensureValidIdentification(value);
    }

    private ensureValidIdentification(value: string) {
        if (this.isEmpty(value)) {
            throw new EmptyCustomerIdentificationError();
        }
    }

    private isEmpty(value: string) {
        return value === null || value === undefined || value.length === 0;
    }
}

export class EmptyCustomerIdentificationError extends RuntimeError {
}
