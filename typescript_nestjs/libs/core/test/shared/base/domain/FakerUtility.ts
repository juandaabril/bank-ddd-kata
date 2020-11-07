import * as faker from 'faker';
import FakerStatic = Faker.FakerStatic;

export class FakerUtility {
    static get(): FakerStatic {
        return faker;
    }
}
