import {CustomerId} from "../../../../src/core/customer/domain/CustomerId";
import {CustomerRepository} from "../../../../src/core/customer/domain/CustomerRepository";
import {CreateCustomer} from "../../../../src/core/customer/application/CreateCustomer";
import {CustomerFirstName} from "../../../../src/core/customer/domain/CustomerFirstName";
import {CustomerFirstNameMother} from "../domain/CustomerFirstNameMother";
import {CustomerLastName} from "../../../../src/core/customer/domain/CustomerLastName";
import {CustomerLastNameMother} from "../domain/CustomerLastNameMother";
import {CustomerIdMother} from "../domain/CustomerIdMother";
import {CustomerIdentificationMother} from "../domain/CustomerIdentificationMother";
import {CustomerMobilePhoneMother} from "../domain/CustomerMobilePhoneMother";
import {CustomerMobilePhone} from "../../../../src/core/customer/domain/CustomerMobilePhone";
import {CustomerIdentification} from "../../../../src/core/customer/domain/CustomerIdentification";
import {InMemoryCustomerRepository} from "../../../../src/core/customer/infrastructure/InMemoryCustomerRepository";

describe('CreateCustomer should', () => {

    let customerRepository: CustomerRepository;
    let createCustomer: CreateCustomer;

    test('create a new customer', async () => {
        const customerId = CustomerIdMother.random();
        const identification = CustomerIdentificationMother.random();
        const firstName = CustomerFirstNameMother.random();
        const lastName = CustomerLastNameMother.random();
        const mobilePhone = CustomerMobilePhoneMother.random();

        given_a_use_case();

        await when_customer_is_created(customerId, identification, firstName, lastName, mobilePhone);

        await then_the_customer_has_this_data(customerId, identification, firstName, lastName, mobilePhone);
    });


    function given_a_use_case() {
        customerRepository = new InMemoryCustomerRepository();

        createCustomer = new CreateCustomer(
            customerRepository
        );
    }


    async function when_customer_is_created(customerId: CustomerId, identification: CustomerIdentification, firstName: CustomerFirstName, lastName: CustomerLastName, mobilePhone: CustomerMobilePhone) {
        await createCustomer.execute(customerId, identification, firstName, lastName, mobilePhone);
    }

    async function then_the_customer_has_this_data(customerId: CustomerId, identification: CustomerIdentification, firstName: CustomerFirstName, lastName: CustomerLastName, mobilePhone: CustomerMobilePhone) {
        const customer = await customerRepository.findById(customerId);

        expect(customer).not.toBeNull();
        expect(customer.id).toEqual(customerId);
        expect(customer.identification).toEqual(identification);
        expect(customer.firstName).toEqual(firstName);
        expect(customer.lastName).toEqual(lastName);
        expect(customer.mobilePhone).toEqual(mobilePhone);
    }

});
