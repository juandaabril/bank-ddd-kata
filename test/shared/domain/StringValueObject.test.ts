import {StringValueObject} from "../../../src/shared/domain/StringValueObject";

describe('StringValueObject should', () => {

    test('create a simple value object', () => {
        const valueObject = new StringValueObject('hello');

        expect(valueObject.value).toBe('hello');
    });
});
