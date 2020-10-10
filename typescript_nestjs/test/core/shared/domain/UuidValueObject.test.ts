import {InvalidUuidError, UuidValueObject} from "../../../../src/core/shared/domain/UuidValueObject";
import {UuidValueObjectMother} from "./UuidValueObjectMother";

describe('Uuid', () => {

    test('create a  Uuid', () => {
        const validUuid = UuidValueObjectMother.random();

        const uuid = new UuidValueObject(validUuid);

        expect(uuid).not.toBeNull();
        expect(uuid.value).not.toBeNull();
        expect(uuid.value).toBe(validUuid);
    });

    test('two Uuid are equals', () => {
        const validUuid = UuidValueObjectMother.random();

        const uuidA = new UuidValueObject(validUuid);
        const uuidB = new UuidValueObject(validUuid);

        expect(uuidA.value).toBe(uuidB.value);
    });

    test('cannot create a empty uuid', () => {
        const invalidUuid = UuidValueObjectMother.invalid();

        const execute = () => {
            new UuidValueObject(invalidUuid);
        };

        expect(execute).toThrow(InvalidUuidError);
    });
});

