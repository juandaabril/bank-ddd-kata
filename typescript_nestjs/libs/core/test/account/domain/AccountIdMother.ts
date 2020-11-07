import {AccountId} from "@app/core/account/domain/AccountId";
import {UuidValueObjectMother} from "../../shared/base/domain/UuidValueObjectMother";

export class AccountIdMother {

    static random(): AccountId {
        return new AccountId(
            UuidValueObjectMother.random()
        );
    }
}
