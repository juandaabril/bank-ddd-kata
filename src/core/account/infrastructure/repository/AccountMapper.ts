import {Account} from "../../domain/Account";
import {Debit} from "../../domain/Debit";
import {Credit} from "../../domain/Credit";

export class AccountMapper {

    static toFirebase(account: Account){
        return {
            id: account.id.value,
            openingDate: account.openingDate.value,
            status: account.status.toString(),
            customerId: account.customerId.value,
            debits: DebitMapper.toFirebase(account.debits),
            credits: CreditMapper.toFirebase(account.credits)
        };
    }
}

export class DebitMapper {

    static toFirebase(debits: Debit[]){
        return debits.map((debit) => {
            return {
                description: debit.description,
                amount: debit.amount,
                transactionDate: debit.transactionDate
            }
        });
    }
}

export class CreditMapper {

    static toFirebase(credits: Credit[]){
        return credits.map((credit) => {
            return {
                description: credit.description,
                amount: credit.amount,
                transactionDate: credit.transactionDate
            }
        });
    }
}
