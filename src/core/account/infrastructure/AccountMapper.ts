import {Account} from "../domain/Account";
import {Debit} from "../domain/Debit";
import {Credit} from "../domain/Credit";
import {AccountId} from "../domain/AccountId";
import {CustomerId} from "../../customer/domain/CustomerId";
import {AccountStatus} from "../domain/AccountStatus";
import {AccountOpeningDate} from "../domain/AccountOpeningDate";
import {Description} from "../domain/Description";
import {Amount} from "../domain/Amount";
import {TransactionDate} from "../domain/TransactionDate";

export class AccountMapper {

    static fromFirebase(document: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) {
        const debits = DebitMapper.fromFirebase(document.get('debits'));
        const credits = CreditMapper.fromFirebase(document.get('credits'));

        return new Account(
            new AccountId(document.id),
            new CustomerId(document.get('customerId')),
            AccountStatus[document.get('status')],
            new AccountOpeningDate(document.get('openingDate')),
            debits,
            credits
        );
    }

    static toFirebase(account: Account) {
        return {
            id: account.id.value,
            openingDate: account.openingDate.format(),
            status: account.status.toString(),
            customerId: account.customerId.value,
            debits: DebitMapper.toFirebase(account.debits),
            credits: CreditMapper.toFirebase(account.credits)
        };
    }
}


export class DebitMapper {

    static fromFirebase(debits: any[]): Debit[] {
        return debits.map((debit) => new Debit(
            new Description(debit.description),
            new Amount(debit.amount),
            new TransactionDate(debit.transactionDate),
        ));
    }

    static toFirebase(debits: Debit[]) {
        return debits.map((debit) => {
            return {
                description: debit.description.value,
                amount: debit.amount.value,
                transactionDate: debit.transactionDate.format()
            }
        });
    }
}

export class CreditMapper {

    static fromFirebase(credits: any[]): Credit[] {
        return credits.map((credit) => new Credit(
            new Description(credit.description),
            new Amount(credit.amount),
            new TransactionDate(credit.transactionDate),
        ));
    }

    static toFirebase(credits: Credit[]) {
        return credits.map((credit) => {
            return {
                description: credit.description.value,
                amount: credit.amount.value,
                transactionDate: credit.transactionDate.format()
            }
        });
    }
}
