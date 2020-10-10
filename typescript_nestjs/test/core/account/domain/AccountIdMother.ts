import {AccountId} from "../../../../src/core/account/domain/AccountId";
import {UuidValueObjectMother} from "../../shared/domain/UuidValueObjectMother";

export class AccountIdMother {

    static random(): AccountId {
        return new AccountId(
            UuidValueObjectMother.random()
        );
    }
}
