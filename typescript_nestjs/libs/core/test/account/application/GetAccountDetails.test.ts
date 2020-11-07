import { CustomerId } from '@app/core/customer/domain/CustomerId';
import { Account } from '@app/core/account/domain/Account';
import { AccountDetails, GetAccountDetails } from '@app/core/account/application/GetAccountDetails';
import { AccountMother } from '../domain/AccountMother';
import { AccountRepository } from '@app/core/account/domain/AccountRepository';
import { InMemoryAccountRepository } from '@app/core/account/infrastructure/repository/InMemoryAccountRepository';
import { AccountId } from '@app/core/account/domain/AccountId';
import { MoneyValueObject } from '@app/core/shared/base/domain/MoneyValueObject';

describe('GetAccountDetails should', () => {

    let accountRepository: AccountRepository;
    let getAccountDetails: GetAccountDetails;
    let accountDetails: AccountDetails;

    test('get the account details', async () => {
        const account = AccountMother.withThisBalance(new MoneyValueObject(1000));

        given_a_use_case();
        await and_a_account_whit_this_data(account);

        await when_get_customer_details(account.id, account.customerId);

        await then_the_customer_details_has_this_info(account);
    });

    function given_a_use_case() {
        accountRepository = new InMemoryAccountRepository();

        getAccountDetails = new GetAccountDetails(
            accountRepository,
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
        expect(accountDetails.balance).toBe(account.balance.value);
    }
});
