import { AccountId } from './AccountId';
import { CustomerId } from '../../customer/domain/CustomerId';
import { Debit } from '../../transaction/domain/Debit';
import { Description } from '../../transaction/domain/Description';
import { Credit } from '../../transaction/domain/Credit';
import { AccountStatus } from './AccountStatus';
import { RuntimeError } from '../../shared/base/domain/RuntimeError';
import { DateValueObject } from '../../shared/base/domain/DateValueObject';
import { MoneyValueObject } from '../../shared/base/domain/MoneyValueObject';

export class Account {
    private _id: AccountId;
    private _customerId: CustomerId;
    private _status: AccountStatus;
    private _openingDate: DateValueObject;
    private _balance: MoneyValueObject;

    constructor(id: AccountId, customerId: CustomerId, status: AccountStatus, openingDate: DateValueObject, balance: MoneyValueObject) {
        this._id = id;
        this._status = status;
        this._customerId = customerId;
        this._openingDate = openingDate;
        this._balance = balance;
    }

    static create(accountId: AccountId, customerId: CustomerId, openingDate: DateValueObject): Account {
        return new Account(
            accountId,
            customerId,
            AccountStatus.OPEN,
            openingDate,
            new MoneyValueObject(0),
        );
    }

    deposit(description: Description, amount: MoneyValueObject, transactionDate: DateValueObject): void {
        const debit = Debit.create(description, amount, transactionDate);

        this._balance = this.balance.add(amount);
    }

    withdraw(description: Description, amount: MoneyValueObject, transactionDate: DateValueObject) {
        if (this.balance.subtract(amount).value < 0) {
            throw new WithdrawWithInsufficientBalance();
        }

        this._balance = this.balance.subtract(amount);
    }

    close() {
        if (this.balance.value !== 0) {
            throw new AccountCannotBeClosedWithExistingFunds();
        }

        this._status = AccountStatus.CLOSED;
    }

    get balance(): MoneyValueObject {
        return this._balance;
    }

    get id(): AccountId {
        return this._id;
    }

    get customerId(): CustomerId {
        return this._customerId;
    }

    get status(): AccountStatus {
        return this._status;
    }

    get openingDate(): DateValueObject {
        return this._openingDate;
    }
}

export class AccountCannotBeClosedWithExistingFunds extends RuntimeError {
}

export class WithdrawWithInsufficientBalance extends RuntimeError {
}
