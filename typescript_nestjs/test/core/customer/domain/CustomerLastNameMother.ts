import {FakerUtility} from "../../shared/domain/FakerUtility";
import {CustomerLastName} from "../../../../src/core/customer/domain/CustomerLastName";

export class CustomerLastNameMother {
    static random(): CustomerLastName {
        return new CustomerLastName(
            FakerUtility.get().name.lastName()
        );
    }
}
