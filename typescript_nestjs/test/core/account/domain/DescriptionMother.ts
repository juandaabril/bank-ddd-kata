import {Description} from "../../../../src/core/account/domain/Description";
import * as faker from 'faker';

export class DescriptionMother {

    static random(): Description {
        return Description.fromString(faker.random.words(10));
    }
}
