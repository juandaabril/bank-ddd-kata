import {CustomerId} from "@app/core/customer/domain/CustomerId";
import {UuidValueObjectMother} from "../../shared/base/domain/UuidValueObjectMother";

export class CustomerIdMother {

    static random(): CustomerId {
        return new CustomerId(
            UuidValueObjectMother.random()
        );
    }
}
