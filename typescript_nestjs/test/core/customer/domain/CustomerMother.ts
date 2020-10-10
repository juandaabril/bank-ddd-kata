import {CustomerId} from "../../../../src/core/customer/domain/CustomerId";
import {Customer} from "../../../../src/core/customer/domain/Customer";
import {CustomerIdentificationMother} from "./CustomerIdentificationMother";
import {CustomerFirstNameMother} from "./CustomerFirstNameMother";
import {CustomerLastNameMother} from "./CustomerLastNameMother";
import {CustomerMobilePhoneMother} from "./CustomerMobilePhoneMother";
import {CustomerIdMother} from "./CustomerIdMother";

export class CustomerMother {
    static withCustomerId(customerId: CustomerId): Customer {
        return new Customer(
            customerId,
            CustomerIdentificationMother.random(),
            CustomerFirstNameMother.random(),
            CustomerLastNameMother.random(),
            CustomerMobilePhoneMother.random()
        );
    }

    static random() {
        return new Customer(
            CustomerIdMother.random(),
            CustomerIdentificationMother.random(),
            CustomerFirstNameMother.random(),
            CustomerLastNameMother.random(),
            CustomerMobilePhoneMother.random()
        );
    }
}
