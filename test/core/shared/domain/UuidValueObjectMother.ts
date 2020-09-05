import * as faker from 'faker';

export class UuidValueObjectMother {

    static random(): string {
        return faker.random.uuid();
    }

    static invalid(): string {
        return '1';
    }
}
