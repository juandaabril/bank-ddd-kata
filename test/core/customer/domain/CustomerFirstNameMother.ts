import {CustomerFirstName} from "../../../../src/core/customer/domain/CustomerFirstName";
import {FakerUtility} from "../../shared/domain/FakerUtility";

export class CustomerFirstNameMother {
    static random(): CustomerFirstName {
        return new CustomerFirstName(
            FakerUtility.get().name.firstName()
        );
    }
}
