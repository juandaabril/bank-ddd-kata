import {Description} from "../../../../src/core/transaction/domain/Description";
import * as faker from 'faker';

export class DescriptionMother {

    static random(): Description {
        return new Description(faker.random.words(10));
    }
}
