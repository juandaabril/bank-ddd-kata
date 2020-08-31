import {Description} from "../../../../src/core/account/domain/Description";

export class DescriptionMother {

    static random(): Description {
        return new Description('ASAS');
    }
}
