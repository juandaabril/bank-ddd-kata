import { Global, Module } from '@nestjs/common';
import { CustomerRepository } from '../domain/CustomerRepository';
import { FirebaseCustomerRepository } from './respository/FirebaseCustomerRepository';
import { GetCustomerDetails } from '../application/GetCustomerDetails';
import { EventBus } from '../../shared/bus/domain/EventBus';
import { CreateCustomer } from '../application/CreateCustomer';

//repositories
const customerRepository = {
    provide: 'CustomerRepository',
    useClass: FirebaseCustomerRepository,
};

//use cases
const createCustomer = {
    provide: CreateCustomer,
    useFactory: (
        customerRepository: CustomerRepository,
        eventBus: EventBus,
    ) => {
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
    providers: [customerRepository, createCustomer, getCustomerDetails],
    exports: [customerRepository, createCustomer, getCustomerDetails],
})
export class CustomerModule {}
