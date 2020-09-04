import {AccountRepository} from "../../domain/AccountRepository";
import {Account} from '../../domain/Account';
import {AccountId} from "../../domain/AccountId";
import {FirebaseClient} from "../../../shared/infrastructure/FirebaseClient";
import {Injectable} from "@nestjs/common";
import {AccountMapper} from "./AccountMapper";

@Injectable()
export class FirebaseAccountRepository implements AccountRepository {

    constructor(private firebaseClient: FirebaseClient) {
    }

    async findById(accountId: AccountId): Promise<Account | null> {
        const result = await this.firestore.collection('accounts').doc(accountId.value).get();

        if (!result.exists) {
            return null;
        }

        return AccountMapper.fromFirebase(result);
    }

    async store(account: Account): Promise<void> {
        const raw = AccountMapper.toFirebase(account);

        await this.firestore.collection('accounts')
            .doc(account.id.value)
            .set(raw);

        return Promise.resolve();
    }

    private get firestore(): firebase.firestore.Firestore {
        return this.firebaseClient.firestore
    }
}

