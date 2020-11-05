import { CustomerMobilePhone } from '../domain/CustomerMobilePhone';
import { CustomerLastName } from '../domain/CustomerLastName';
import { CustomerFirstName } from '../domain/CustomerFirstName';
import { CustomerIdentification } from '../domain/CustomerIdentification';
import { CustomerId } from '../domain/CustomerId';
import { CustomerRepository } from '../domain/CustomerRepository';
import { Customer } from '../domain/Customer';
import { EventBus } from '../../shared/bus/domain/EventBus';


export class CreateCustomer {
    constructor(private customerRepository: CustomerRepository, private eventBus: EventBus) {
    }

    async execute(customerId: CustomerId, identification: CustomerIdentification, firstName: CustomerFirstName, lastName: CustomerLastName, mobilePhone: CustomerMobilePhone): Promise<void> {
        const customer = Customer.create(
            customerId,
            identification,
            firstName,
            lastName,
            mobilePhone,
        );

        await this.customerRepository.store(customer);
        await this.eventBus.publish(customer.pullDomainEvents());
    }
}
