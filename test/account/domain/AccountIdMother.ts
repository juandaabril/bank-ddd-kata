import {AccountId} from "../../../src/account/domain/AccountId";

export class AccountIdMother {

    static random(): AccountId {
        return new AccountId('1');
    }
}
