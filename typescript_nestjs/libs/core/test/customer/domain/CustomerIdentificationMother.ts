import {FakerUtility} from "../../shared/base/domain/FakerUtility";
import {CustomerMobilePhone} from "@app/core/customer/domain/CustomerMobilePhone";
import {CustomerIdentification} from "@app/core/customer/domain/CustomerIdentification";

export class CustomerIdentificationMother {
    static random(): CustomerIdentification {
        return new CustomerIdentification(
            FakerUtility.get().random.alphaNumeric(10)
        );
    }
}
