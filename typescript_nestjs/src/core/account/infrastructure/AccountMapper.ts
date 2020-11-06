import { Account } from '../domain/Account';
import { AccountId } from '../domain/AccountId';
import { CustomerId } from '../../customer/domain/CustomerId';
import { AccountStatus } from '../domain/AccountStatus';
import { MoneyValueObject } from '../../shared/base/domain/MoneyValueObject';
import { DateValueObject } from '../../shared/base/domain/DateValueObject';

export class AccountMapper {

    static fromFirebase(document: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) {
        return new Account(
            new AccountId(document.id),
            new CustomerId(document.get('customerId')),
            AccountStatus[document.get('status')],
            DateValueObject.fromString(document.get('openingDate')),
            MoneyValueObject.fromString(document.get('balance')),
        );
    }

    static toFirebase(account: Account) {
        return {
            id: account.id.value,
            openingDate: account.openingDate.format(),
            status: account.status.toString(),
            customerId: account.customerId.value,
            balance: account.balance.value,
        };
    }
}


