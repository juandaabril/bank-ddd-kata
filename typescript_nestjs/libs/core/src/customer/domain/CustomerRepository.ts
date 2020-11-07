import { Customer } from './Customer';
import { CustomerId } from './CustomerId';

export interface CustomerRepository {
    findById(customerId: CustomerId): Promise<Customer | undefined>;

    store(customer: Customer): Promise<void>;
}
