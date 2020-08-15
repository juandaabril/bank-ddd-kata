import {MoneyValueObject} from "../../../src/shared/domain/MoneyValueObject";

describe('MoneyValueObject should', () => {

    test('create a simple value object', () => {
        const money = new MoneyValueObject(100);

        expect(money.value).toBe(100);
    });
});
