import { instance, mock, when } from 'ts-mockito';
import { DateService } from '@app/core/shared/base/domain/DateService';
import { DateValueObjectMother } from '../../shared/base/domain/DateValueObjectMother';
import { AccountMother } from '../domain/AccountMother';
import { AccountRepository } from '@app/core/account/domain/AccountRepository';
import {
    Account,
    WithdrawWithInsufficientBalance,
} from '@app/core/account/domain/Account';
import { AccountId } from '@app/core/account/domain/AccountId';
import { CustomerId } from '@app/core/customer/domain/CustomerId';
import { DescriptionMother } from '../domain/DescriptionMother';
import { Description } from '@app/core/transaction/domain/Description';
import { InMemoryAccountRepository } from '@app/core/account/infrastructure/repository/InMemoryAccountRepository';
import { WithdrawFundsFromAccount } from '@app/core/account/application/WithdrawFundsFromAccount';
import { MoneyValueObject } from '@app/core/shared/base/domain/MoneyValueObject';
import { DateValueObject } from '@app/core/shared/base/domain/DateValueObject';

describe('WithdrawFundsFromAccount should', () => {

    let accountRepository: AccountRepository;
    let dateService: DateService;
    let withdrawFundsFromAccount: WithdrawFundsFromAccount;
    let executor: () => void;

    test('add a credit into the account', async () => {
        const balance = new MoneyValueObject(1000);
        const account = AccountMother.withThisBalance(balance);
        const transactionDate = DateValueObjectMother.random();
        const description = DescriptionMother.random();
        const amount = new MoneyValueObject(100);

        given_a_use_case();
        and_a_date_with_this_value(transactionDate);
        await and_a_account_with_this_data(account);

        await when_a_withdraw_is_made(account.id, account.customerId, description, amount);

        await then_the_accounts_has_this_data(account.id, account.customerId, balance, description, amount, transactionDate);
    });

    test('do not allow the Customer to Withdraw more than the existing funds', async () => {
        const balance = new MoneyValueObject(0);
        const account = AccountMother.withThisBalance(balance);
        const transactionDate = DateValueObjectMother.random();
        const description = DescriptionMother.random();
        const amount = new MoneyValueObject(100);

        given_a_use_case();
        and_a_date_with_this_value(transactionDate);
        await and_a_account_with_this_data(account);

        await when_a_withdraw_is_made_and_throw_error(account.id, account.customerId, description, amount);

        await then_the_action_throw_this_error(WithdrawWithInsufficientBalance);
    });


    function given_a_use_case() {
        accountRepository = new InMemoryAccountRepository();
        dateService = mock<DateService>();

        withdrawFundsFromAccount = new WithdrawFundsFromAccount(
            accountRepository,
            instance(dateService),
        );
    }

    function and_a_date_with_this_value(date: DateValueObject) {
        when(dateService.today()).thenResolve(date);
    }

    async function and_a_account_with_this_data(account: Account) {
        await accountRepository.store(account);
    }

    async function when_a_withdraw_is_made(accountId: AccountId, customerId: CustomerId, description: Description, amount: MoneyValueObject) {
        await withdrawFundsFromAccount.execute(accountId, customerId, description, amount);
    }

    async function when_a_withdraw_is_made_and_throw_error(accountId: AccountId, customerId: CustomerId, description: Description, amount: MoneyValueObject) {
        executor = async () => {
            await withdrawFundsFromAccount.execute(accountId, customerId, description, amount);
        };
    }

    async function then_the_accounts_has_this_data(accountId: AccountId, customerId: CustomerId, balance: MoneyValueObject, description: Description, amount: MoneyValueObject, transactionDate: DateValueObject) {
        const account = await accountRepository.findById(accountId);

        expect(account).not.toBeNull();
        expect(account.id).toStrictEqual(accountId);
        expect(account.customerId).toStrictEqual(customerId);
        expect(account.balance).toBeEquals(balance.subtract(amount));
    }

    async function then_the_action_throw_this_error(error: any) {
        await expect(executor()).rejects.toThrow(error);
    }
});
