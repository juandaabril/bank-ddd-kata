import { AccountId } from '../domain/AccountId';
import { AccountRepository } from '../domain/AccountRepository';
import { CustomerId } from '../../customer/domain/CustomerId';

export class GetAccountDetails {
    constructor(private accountRepository: AccountRepository) {}

    async execute(
        accountId: AccountId,
        customerId: CustomerId,
    ): Promise<AccountDetails> {
        const account = await this.accountRepository.findById(accountId);
        return {
            accountId: account.id.value,
            customerId: account.customerId.value,
            balance: account.balance.value,
            status: account.status,
            openingDate: account.openingDate.format(),
        };
    }
}

export type AccountDetails = {
    accountId: string;
    customerId: string;
    balance: number;
    status: string;
    openingDate: string;
};
