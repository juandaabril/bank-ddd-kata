import {CustomerId} from "../../../../src/core/customer/domain/CustomerId";
import {Account} from "../../../../src/core/account/domain/Account";
import {AccountDetails, GetAccountDetails} from "../../../../src/core/account/infrastructure/GetAccountDetails";
import {AccountMother} from "../domain/AccountMother";
import {AccountRepository} from "../../../../src/core/account/domain/AccountRepository";
import {InMemoryAccountRepository} from "../../../../src/core/account/infrastructure/InMemoryAccountRepository";
import {AccountId} from "../../../../src/core/account/domain/AccountId";

describe('GetAccountDetails should', () => {

    let accountRepository: AccountRepository;
    let getAccountDetails: GetAccountDetails;
    let accountDetails: AccountDetails;

    test('get the account details', async () => {
        const account = AccountMother.withThisDebit(1000);

        given_a_use_case();
        await and_a_account_whit_this_data(account);

        await when_get_customer_details(account.id, account.customerId);

        await then_the_customer_details_has_this_info(account);
    });

    function given_a_use_case() {
        accountRepository = new InMemoryAccountRepository();

        getAccountDetails = new GetAccountDetails(
            accountRepository
        );
    }

    async function and_a_account_whit_this_data(account: Account) {
        await accountRepository.store(account);
    }


    async function when_get_customer_details(accountId: AccountId, customerId: CustomerId) {
        accountDetails = await getAccountDetails.execute(accountId, customerId);
    }

    async function then_the_customer_details_has_this_info(account: Account) {
        expect(accountDetails).not.toBeNull();
        expect(accountDetails.accountId).toBe(account.id.value);
        expect(accountDetails.customerId).toBe(account.customerId.value);
        expect(accountDetails.status).toBe(account.status);
        expect(accountDetails.openingDate).toBe(account.openingDate.format());
        expect(accountDetails.balance).toBe(account.balance);
        expect(accountDetails.debits.length).toBe(1);
        expect(accountDetails.credits.length).toBe(0);
    }
});
