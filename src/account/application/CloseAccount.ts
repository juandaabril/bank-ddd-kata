import {AccountRepository} from "../domain/AccountRepository";
import {AccountId} from "../domain/AccountId";
import {DateService} from "../../shared/domain/DateService";
import {CustomerId} from "../../customer/domain/CustomerId";
import {Amount} from "../domain/Amount";
import {TransactionDate} from "../domain/TransactionDate";
import {Description} from "../domain/Description";

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
