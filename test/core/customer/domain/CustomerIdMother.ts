import {CustomerId} from "../../../../src/core/customer/domain/CustomerId";

export class CustomerIdMother {

    static random(): CustomerId {
        return new CustomerId('3');
    }
}
