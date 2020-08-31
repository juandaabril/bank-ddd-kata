import {DateValueObject} from "../../../../src/core/shared/domain/DateValueObject";

describe('SimpleDate should', () => {

    test('can create a simple date', () => {
        const simpleDate = new DateValueObject('05/10/2020');

        expect(simpleDate.value).toBe('05/10/2020');
    });


    test('can create a simple date with zero month', () => {
        const simpleDate = new DateValueObject('05/01/2020');

        expect(simpleDate.value).toBe('05/01/2020');
    });

});
