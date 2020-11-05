import {NumberValueObject} from "./NumberValueObject";

export class MoneyValueObject extends NumberValueObject {
    add(amount: MoneyValueObject): MoneyValueObject {
        return new MoneyValueObject(
            this.value + amount.value
        )
    }

    subtract(amount: MoneyValueObject) {
        return new MoneyValueObject(
            this.value - amount.value
        )
    }
}
