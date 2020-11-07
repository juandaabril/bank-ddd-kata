import { CustomerRepository } from '../../domain/CustomerRepository';
import { Customer } from '../../domain/Customer';
import { CustomerId } from '../../domain/CustomerId';

export class InMemoryCustomerRepository implements CustomerRepository {
    private _database = new Map<string, Customer>();

    findById(customerId: CustomerId): Promise<Customer | undefined> {
        const customer = this._database.get(customerId.value);

        return Promise.resolve(customer || null);
    }

    store(customer: Customer): Promise<void> {
        this._database.set(customer.id.value, customer);
        return Promise.resolve();
    }
}
