import {Account} from './Account';
import {AccountId} from "./AccountId";

export const AccountRepositoryName = 'AccountRepository';

export interface AccountRepository {
    findById(accountId: AccountId): Promise<Account | undefined>;

    store(account: Account): Promise<void>;
}
