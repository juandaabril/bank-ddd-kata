import {NumberValueObject} from "./NumberValueObject";

export class MoneyValueObject extends NumberValueObject {
    add(amount: MoneyValueObject): MoneyValueObject {
        return new MoneyValueObject(
            this.value + amount.value
        )
    }

    subtract(amount: MoneyValueObject): MoneyValueObject {
        return new MoneyValueObject(
            this.value - amount.value
        )
    }

    static fromString(balance: string): MoneyValueObject {
        return new MoneyValueObject(0);
    }
}
