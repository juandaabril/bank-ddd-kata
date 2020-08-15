import {Description} from "../../../src/account/domain/Description";

export class DescriptionMother {

    static random(): Description {
        return new Description('ASAS');
    }
}
