import {CustomerId} from "../../../../src/core/customer/domain/CustomerId";
import {UuidValueObjectMother} from "../../shared/domain/UuidValueObjectMother";

export class CustomerIdMother {

    static random(): CustomerId {
        return new CustomerId(
            UuidValueObjectMother.random()
        );
    }
}
