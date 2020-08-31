import {AccountId} from "../../../../src/core/account/domain/AccountId";

export class AccountIdMother {

    static random(): AccountId {
        return new AccountId('1');
    }
}
