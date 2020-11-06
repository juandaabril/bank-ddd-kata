import { Global, Module } from '@nestjs/common';
import { CreateCustomer } from '../../core/customer/application/CreateCustomer';
import { CustomerRepository } from '../../core/customer/domain/CustomerRepository';
import { GetCustomerDetails } from '../../core/customer/application/GetCustomerDetails';
import { FirebaseCustomerRepository } from '../../core/customer/infrastructure/FirebaseCustomerRepository';
import { EventBus } from '../../core/shared/bus/domain/EventBus';

//repositories
const customerRepository = { provide: 'CustomerRepository', useClass: FirebaseCustomerRepository };

//use cases
const createCustomer = {
    provide: CreateCustomer,
    useFactory: (customerRepository: CustomerRepository, eventBus: EventBus) => {
        return new CreateCustomer(customerRepository, eventBus);
    },
    inject: ['CustomerRepository', 'EventBus'],
};

const getCustomerDetails = {
    provide: GetCustomerDetails,
    useFactory: (customerRepository: CustomerRepository) => {
        return new GetCustomerDetails(customerRepository);
    },
    inject: ['CustomerRepository'],
};

@Global()
@Module({
    providers: [
        customerRepository,
        createCustomer,
        getCustomerDetails,
    ],
    exports: [
        customerRepository,
        createCustomer,
        getCustomerDetails,
    ],
})
export class CustomerModule {
}
