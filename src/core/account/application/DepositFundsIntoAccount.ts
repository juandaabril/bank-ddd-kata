import {AccountRepository} from "../domain/AccountRepository";
import {AccountId} from "../domain/AccountId";
import {CustomerId} from "../../customer/domain/CustomerId";
import {Amount} from "../domain/Amount";
import {TransactionDate} from "../domain/TransactionDate";
import {Description} from "../domain/Description";
import {DateService} from "../../shared/domain/DateService";

export class DepositFundsIntoAccount {
    constructor(
        private accountRepository: AccountRepository,
        private dateService: DateService
    ) {}

    async execute(accountId: AccountId, customerId: CustomerId, description: Description, amount: Amount): Promise<void> {
        const today = await this.dateService.today();
        const transactionDate = TransactionDate.fromDate(today);
        const account = await this.accountRepository.findById(accountId);

        account.deposit(description, amount, transactionDate);

        await this.accountRepository.store(account);
    }
}
