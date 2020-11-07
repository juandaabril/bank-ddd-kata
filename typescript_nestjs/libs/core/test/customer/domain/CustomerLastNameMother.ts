import {FakerUtility} from "../../shared/base/domain/FakerUtility";
import {CustomerLastName} from "@app/core/customer/domain/CustomerLastName";

export class CustomerLastNameMother {
    static random(): CustomerLastName {
        return new CustomerLastName(
            FakerUtility.get().name.lastName()
        );
    }
}
