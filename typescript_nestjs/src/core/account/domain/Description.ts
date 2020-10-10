import {ValueObject} from "../../shared/domain/ValueObject";

export class Description extends ValueObject<string> {
    static fromString(value: string): Description {
        return new Description(value);
    }
}
