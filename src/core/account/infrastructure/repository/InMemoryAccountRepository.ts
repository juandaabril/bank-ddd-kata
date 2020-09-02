import {AccountRepository} from "../../domain/AccountRepository";
import {Account} from '../../domain/Account';
import {AccountId} from "../../domain/AccountId";

export class InMemoryAccountRepository implements AccountRepository {

    private _database = new Map<string, Account>();

    findById(accountId: AccountId): Promise<Account|null> {
        const account = this._database.get(accountId.value);

        return Promise.resolve(account || null);
    }

    store(account: Account): Promise<void> {
        console.log(account);
        this._database.set(account.id.value, account);
        return Promise.resolve();
    }
}
