import {AccountId} from "../domain/AccountId";
import {AccountRepository} from "../domain/AccountRepository";
import {CustomerId} from "../../customer/domain/CustomerId";
import {Debit} from "../domain/Debit";
import {Credit} from "../domain/Credit";

export class GetAccountDetails {
    constructor(private accountRepository: AccountRepository) {
    }

    async execute(accountId: AccountId, customerId: CustomerId): Promise<AccountDetails> {
        const account = await this.accountRepository.findById(accountId);
        console.log(account);
        return {
            accountId: account.id.value,
            customerId: account.customerId.value,
            balance: account.balance,
            status: account.status,
            openingDate: account.openingDate.format(),
            debits: this.debits(account.debits),
            credits: this.credits(account.credits),
        };
    }

    private debits(debits: Debit[]): TransactionDetails[] {
        return debits.map((debit) => {
            return {
                transactionDate: debit.transactionDate.format(),
                description: debit.description.value,
                amount: debit.amount.value
            };
        });
    }

    private credits(credits: Credit[]): TransactionDetails[] {
        return credits.map((credit) => {
            return {
                transactionDate: credit.transactionDate.format(),
                description: credit.description.value,
                amount: credit.amount.value
            };
        });
    }
}

export type AccountDetails = {
    accountId: string;
    customerId: string;
    balance: number;
    status: string;
    openingDate: string;
    debits: TransactionDetails[];
    credits: TransactionDetails[];
};


export type TransactionDetails = {
    transactionDate: string;
    description: string;
    amount: number;
}
