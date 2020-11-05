import {DateValueObject} from "../../../../../src/core/shared/base/domain/DateValueObject";

describe('DateValueObject', () => {

    test('can create a DateValueObject from string', () => {
        const date = '24/02/2019';

        const dateValueObject = DateValueObject.fromString(date);

        expect(dateValueObject).not.toBeNull();
        expect(dateValueObject.format()).toBe(date);
    });

    test('two DateValueObject are equal', () => {
        const date = '24/02/2019';

        const dateValueObjectA = DateValueObject.fromString(date);
        const dateValueObjectB = DateValueObject.fromString(date);

        expect(dateValueObjectA).toEqual(dateValueObjectB);
    });
});
