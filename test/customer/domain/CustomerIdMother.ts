import {CustomerId} from "../../../src/customer/domain/CustomerId";

export class CustomerIdMother {

    static random(): CustomerId {
        return new CustomerId('3');
    }
}
