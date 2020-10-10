import {CustomerId} from "../domain/CustomerId";
import {CustomerRepository} from "../domain/CustomerRepository";

export class GetCustomerDetails {
    constructor(private customerRepository: CustomerRepository) {
    }

    async execute(customerId: CustomerId): Promise<CustomerDetails> {
        const customer = await this.customerRepository.findById(customerId);

        return {
            id: customer.id.value,
            identification: customer.identification.value,
            firstName: customer.firstName.value,
            lastName: customer.lastName.value,
            mobilePhone: customer.mobilePhone.value
        };
    }
}

export type CustomerDetails = {
    id: string;
    identification: string;
    firstName: string;
    lastName: string;
    mobilePhone: string;
}
