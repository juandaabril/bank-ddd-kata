import {Account} from './Account';
import {AccountId} from "./AccountId";

export const AccountRepositoryName = 'AccountRepository';

export interface AccountRepository {
    findById(accountId: AccountId): Promise<Account>;
    store(account: Account): Promise<void>;
}
