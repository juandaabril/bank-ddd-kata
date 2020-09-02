import {AccountRepository} from "../domain/AccountRepository";
import {Account} from '../domain/Account';
import {AccountId} from "../domain/AccountId";
import {FirebaseClient} from "../../shared/infrastructure/FirebaseClient";
import {Injectable} from "@nestjs/common";
import {CustomerId} from "../../customer/domain/CustomerId";

@Injectable()
export class FirebaseAccountRepository implements AccountRepository {


    constructor(private firebaseClient: FirebaseClient) {}

    async findById(accountId: AccountId): Promise<Account | null> {
        const result = await this.firestore.collection('notes').doc(accountId.value).get();
        if (!result) {
            throw new Error('not found');
        }

        return Promise.resolve(this.firebaseToEntity(result));
    }

    private firebaseToEntity(doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>): Account {
        return new Account(
            new AccountId(doc.id),
            new CustomerId(doc.get('customerId')),
            doc.get('status'),
            doc.get('openingDate'),

            doc.get('content')
        );
    }


    store(account: Account): Promise<void> {
        console.log(account);
        this._database.set(account.id.value, account);
        return Promise.resolve();
    }


    private get firestore():firebase.firestore.Firestore {
        return this.firebaseClient.firestore
    }
}

