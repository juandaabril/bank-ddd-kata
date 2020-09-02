import {AccountMother} from "../domain/AccountMother";
import {AccountRepository} from "../../../../src/core/account/domain/AccountRepository";
import {Account, AccountCannotBeClosedWithExistingFunds} from "../../../../src/core/account/domain/Account";
import {AccountId} from "../../../../src/core/account/domain/AccountId";
import {CustomerId} from "../../../../src/core/customer/domain/CustomerId";
import {InMemoryAccountRepository} from "../../../../src/core/account/infrastructure/repository/InMemoryAccountRepository";
import {CloseAccount} from "../../../../src/core/account/application/CloseAccount";
import {AccountStatus} from "../../../../src/core/account/domain/AccountStatus";

describe('CloseAccount should', () => {

    let accountRepository: AccountRepository;
    let closeAccount: CloseAccount;
    let executor: () => void;

    test('close account when the balance is zero', async () => {
        const account = AccountMother.withZeroBalance();

        given_a_use_case();
        await and_a_account_with_this_data(account);

        await when_the_account_is_closed(account.id, account.customerId);

        await then_the_accounts_has_this_data(account.id, account.customerId);
    });

    test('not close the account if the balance is not zero', async () => {
        const account = AccountMother.withThisDebit(100);
        given_a_use_case();
        await and_a_account_with_this_data(account);

        await when_the_account_is_closed_and_throw_error(account.id, account.customerId);

        await then_the_action_throw_this_error(AccountCannotBeClosedWithExistingFunds);
    });

    function given_a_use_case() {
        accountRepository = new InMemoryAccountRepository();

        closeAccount = new CloseAccount(
            accountRepository,
        );
    }

    async function and_a_account_with_this_data(account: Account) {
        await accountRepository.store(account);
    }

    async function when_the_account_is_closed(accountId: AccountId, customerId: CustomerId) {
        await closeAccount.execute(accountId, customerId);
    }

    async function when_the_account_is_closed_and_throw_error(accountId: AccountId, customerId: CustomerId) {
        executor = async () => {
            await closeAccount.execute(accountId, customerId);
        };
    }

    async function then_the_accounts_has_this_data(accountId: AccountId, customerId: CustomerId) {
        const account = await accountRepository.findById(accountId);

        expect(account).not.toBeNull();
        expect(account.id).toStrictEqual(accountId);
        expect(account.customerId).toStrictEqual(customerId);
        expect(account.status).toBe(AccountStatus.CLOSED);
    }

    async function then_the_action_throw_this_error(error: any) {
        await expect(executor()).rejects.toThrow(error);
        //expect(executor).toThrow(error); --> jest no lo soporta
    }
});
