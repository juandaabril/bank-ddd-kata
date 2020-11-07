import { AccountRepository } from '../domain/AccountRepository';
import { Account } from '../domain/Account';
import { AccountId } from '../domain/AccountId';
import { CustomerId } from '../../customer/domain/CustomerId';
import { DateService } from '../../shared/base/domain/DateService';

export class RegisterNewAccount {
    constructor(
        private accountRepository: AccountRepository,
        private dateService: DateService,
    ) {}

    async execute(accountId: AccountId, customerId: CustomerId): Promise<void> {
        const openingDate = await this.dateService.today();

        const account = Account.create(accountId, customerId, openingDate);

        await this.accountRepository.store(account);
    }
}
