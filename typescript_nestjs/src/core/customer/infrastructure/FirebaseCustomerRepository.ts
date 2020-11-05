import {Injectable} from "@nestjs/common";
import {CustomerRepository} from "../domain/CustomerRepository";
import {CustomerId} from "../domain/CustomerId";
import {Customer} from "../domain/Customer";
import {FirebaseClient} from "../../shared/base/infrastructure/FirebaseClient";
import {CustomerMapper} from "./CustomerMapper";

@Injectable()
export class FirebaseCustomerRepository implements CustomerRepository {

    constructor(private firebaseClient: FirebaseClient) {
    }

    async findById(customerId: CustomerId): Promise<Customer | undefined> {
        const result = await this.firestore.collection('customers').doc(customerId.value).get();

        if (!result.exists) {
            return undefined;
        }

        return CustomerMapper.fromFirebase(result);
    }

    async store(customer: Customer): Promise<void> {
        const raw = CustomerMapper.toFirebase(customer);

        await this.firestore.collection('customers')
            .doc(customer.id.value)
            .set(raw);

        return Promise.resolve();
    }

    private get firestore(): firebase.firestore.Firestore {
        return this.firebaseClient.firestore
    }
}

