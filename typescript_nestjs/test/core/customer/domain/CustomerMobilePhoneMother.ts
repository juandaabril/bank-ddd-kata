import {FakerUtility} from "../../shared/base/domain/FakerUtility";
import {CustomerMobilePhone} from "../../../../src/core/customer/domain/CustomerMobilePhone";

export class CustomerMobilePhoneMother {
    static random(): CustomerMobilePhone {
        return new CustomerMobilePhone(
            FakerUtility.get().phone.phoneNumber()
        );
    }
}
