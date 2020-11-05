import {AccountRepository} from "../domain/AccountRepository";
import {AccountId} from "../domain/AccountId";
import {CustomerId} from "../../customer/domain/CustomerId";
import {Description} from "../../transaction/domain/Description";
import {DateService} from "../../shared/base/domain/DateService";
import { MoneyValueObject } from '../../shared/base/domain/MoneyValueObject';

export class DepositFundsIntoAccount {
    constructor(
        private accountRepository: AccountRepository,
        private dateService: DateService
    ) {}

    async execute(accountId: AccountId, customerId: CustomerId, description: Description, amount: MoneyValueObject): Promise<void> {
        const account = await this.accountRepository.findById(accountId);
        const transactionDate = await this.dateService.today();

        account.deposit(description, amount, transactionDate);

        await this.accountRepository.store(account);
    }
}
