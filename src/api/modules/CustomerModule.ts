import {Global, Module} from "@nestjs/common";
import {CloseAccount} from "../../core/account/application/CloseAccount";
import {DepositFundsIntoAccount} from "../../core/account/application/DepositFundsIntoAccount";
import {RegisterNewAccount} from "../../core/account/application/RegisterNewAccount";
import {AccountRepository} from "../../core/account/domain/AccountRepository";
import {DateService} from "../../core/shared/domain/DateService";
import {FirebaseAccountRepository} from "../../core/account/infrastructure/FirebaseAccountRepository";
import {InMemoryCustomerRepository} from "../../core/customer/infrastructure/InMemoryCustomerRepository";
import {CreateCustomer} from "../../core/customer/application/CreateCustomer";
import {CustomerRepository} from "../../core/customer/domain/CustomerRepository";
import {GetCustomerDetails} from "../../core/customer/application/GetCustomerDetails";

//repositories
const customerRepository = {provide: 'CustomerRepository', useClass: InMemoryCustomerRepository};

//use cases
const createCustomer = {
    provide: CreateCustomer,
    useFactory: (customerRepository: CustomerRepository) => {
        return new CreateCustomer(customerRepository);
    },
    inject: ['CustomerRepository'],
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
