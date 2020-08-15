import {AccountRepository} from "../domain/AccountRepository";
import {AccountId} from "../domain/AccountId";
import {CustomerId} from "../../customer/domain/CustomerId";

export class CloseAccount {
    constructor(
        private accountRepository: AccountRepository
    ) {}

    async execute(accountId: AccountId, customerId: CustomerId): Promise<void> {
        const account = await this.accountRepository.findById(accountId);

        account.close();

        await this.accountRepository.store(account);
    }
}
