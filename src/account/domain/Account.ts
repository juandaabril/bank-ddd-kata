import {AccountOpeningDate} from "./AccountOpeningDate";
import {AccountId} from "./AccountId";
import {CustomerId} from "../../customer/domain/CustomerId";
import {Amount} from "./Amount";
import {TransactionDate} from "./TransactionDate";
import {Debit} from "./Debit";
import {Description} from "./Description";
import {Credit} from "./Credit";
import {AccountStatus} from "./AccountStatus";

export class Account {
    private _id: AccountId;
    private _customerId: CustomerId;
    private _openingDate: AccountOpeningDate;
    private _status: AccountStatus;
    private _debits: Debit[];
    private _credits: Credit[];

    constructor(id: AccountId, customerId: CustomerId, status: AccountStatus, openingDate: AccountOpeningDate, debits: Debit[], credits: Credit[]) {
        this._id = id;
        this._customerId = customerId;
        this._openingDate = openingDate;
        this._debits = debits;
        this._credits = credits;
    }

    static create(accountId: AccountId, customerId: CustomerId, openingDate: AccountOpeningDate): Account {
        return new Account(
            accountId,
            customerId,
            AccountStatus.OPEN,
            openingDate,
            [],
            []
        );
    }

    deposit(description: Description, amount: Amount, transactionDate: TransactionDate): void {
        const debit = Debit.create(description, amount, transactionDate);
        this._debits.push(debit);
    }

    withdraw(description: Description, amount: Amount, transactionDate: TransactionDate) {
        if (this.balance - amount.value < 0) {
            throw new WithdrawWithInsufficientBalance();
        }

        const credit = Credit.create(description, amount, transactionDate);
        this._credits.push(credit);
    }

    close() {
        if (this.balance !== 0) {
            throw new AccountCannotBeClosedWithExistingFunds();
        }

        this._status = AccountStatus.CLOSED;
    }

    private get balance(): number {
        const totalDebits = this._debits
            .map((debit) => debit.amount.value)
            .reduce((prev, current) => prev + current, 0);

        const totalCredits = this._credits
            .map((credit) => credit.amount.value)
            .reduce((prev, current) => prev + current, 0);

        return totalDebits - totalCredits;
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

    get openingDate(): AccountOpeningDate {
        return this._openingDate;
    }

    get debits(): Debit[] {
        return this._debits;
    }

    get credits(): Credit[] {
        return this._credits;
    }
}



export class BasicError extends Error {
    constructor(m?: string) {
        super(m);
        Object.setPrototypeOf(this, BasicError.prototype);
    }
}

export class AccountCannotBeClosedWithExistingFunds extends BasicError {

}

export class WithdrawWithInsufficientBalance extends BasicError {

}
