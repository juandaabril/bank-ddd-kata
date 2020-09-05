import {CustomerId} from "../../../../src/core/customer/domain/CustomerId";
import {CustomerRepository} from "../../../../src/core/customer/domain/CustomerRepository";
import {CustomerIdMother} from "../domain/CustomerIdMother";
import {InMemoryCustomerRepository} from "../../../../src/core/customer/infrastructure/InMemoryCustomerRepository";
import {CustomerDetails, GetCustomerDetails} from "../../../../src/core/customer/application/GetCustomerDetails";
import {CustomerMother} from "../domain/CustomerMother";
import {Customer} from "../../../../src/core/customer/domain/Customer";

describe('GetCustomerDetails should', () => {

    let customerRepository: CustomerRepository;
    let getCustomerDetails: GetCustomerDetails;
    let customerDetails: CustomerDetails;

    test('create a new customer', async () => {
        const customerId = CustomerIdMother.random();
        const customer = CustomerMother.withCustomerId(customerId);

        given_a_use_case();
        await and_a_customer_with_this_data(customer);

        await when_get_customer_details(customerId);

        await then_the_customer_details_has_this_info(customer);
    });

    function given_a_use_case() {
        customerRepository = new InMemoryCustomerRepository();

        getCustomerDetails = new GetCustomerDetails(
            customerRepository
        );
    }


    async function and_a_customer_with_this_data(customer: Customer) {
        await customerRepository.store(customer);
    }


    async function when_get_customer_details(customerId: CustomerId) {
        customerDetails = await getCustomerDetails.execute(customerId);
    }

    async function then_the_customer_details_has_this_info(customer: Customer) {
        expect(customerDetails).not.toBeNull();
        expect(customerDetails.id).toBe(customer.id.value);
        expect(customerDetails.identification).toBe(customer.identification.value);
        expect(customerDetails.firstName).toBe(customer.firstName.value);
        expect(customerDetails.lastName).toBe(customer.lastName.value);
        expect(customerDetails.mobilePhone).toBe(customer.mobilePhone.value);
    }

});
