import {instance, mock, when} from "ts-mockito";
import {DateService} from "../../../src/shared/domain/DateService";
import {DateValueObject} from "../../../src/shared/domain/DateValueObject";
import {DateValueObjectMother} from "../../shared/domain/DateValueObjectMother";
import {AccountMother} from "../domain/AccountMother";
import {AccountRepository} from "../../../src/account/domain/AccountRepository";
import {Account} from "../../../src/account/domain/Account";
import {DepositFundsIntoAccount} from "../../../src/account/application/DepositFundsIntoAccount";
import {AccountId} from "../../../src/account/domain/AccountId";
import {CustomerId} from "../../../src/customer/domain/CustomerId";
import {Amount} from "../../../src/account/domain/Amount";
import {DescriptionMother} from "../domain/DescriptionMother";
import {Description} from "../../../src/account/domain/Description";
import {InMemoryAccountRepository} from "../../../src/account/infrastructure/InMemoryAccountRepository";
import {WithdrawFundsFromAccount} from "../../../src/account/application/WithdrawFundsFromAccount";

describe('WithdrawFundsFromAccount should', () => {

    let accountRepository: AccountRepository;
    let dateService: DateService;
    let withdrawFundsFromAccount: WithdrawFundsFromAccount;

    test('add a credit into the account', async () => {
        const account = AccountMother.withThisDebit(1000);
        const transactionDate = DateValueObjectMother.random();
        const description = DescriptionMother.random();
        const amount = new Amount(100);

        given_a_use_case();
        and_a_date_with_this_value(transactionDate);
        await and_a_account_with_this_data(account);

        await when_a_withdraw_is_made(account.id, account.customerId, description, amount);

        await then_the_accounts_has_this_data(account.id, account.customerId, description, amount, transactionDate);
    });

    function given_a_use_case() {
        accountRepository = new InMemoryAccountRepository();
        dateService = mock<DateService>();

        withdrawFundsFromAccount = new WithdrawFundsFromAccount(
            accountRepository,
            instance(dateService)
        );
    }

    function and_a_date_with_this_value(date: DateValueObject) {
        when(dateService.today()).thenResolve(date);
    }

    async function and_a_account_with_this_data(account: Account) {
        await accountRepository.store(account);
    }

    async function when_a_withdraw_is_made(accountId: AccountId, customerId: CustomerId, description: Description, amount: Amount) {
        await withdrawFundsFromAccount.execute(accountId, customerId, description, amount);
    }

    async function then_the_accounts_has_this_data(accountId: AccountId, customerId: CustomerId, description: Description, amount: Amount, transactionDate: DateValueObject) {
        const account = await accountRepository.findById(accountId);

        expect(account).not.toBeNull();
        expect(account.id).toStrictEqual(accountId);
        expect(account.customerId).toStrictEqual(customerId);
        expect(account.credits.length).toBe(1);
        expect(account.credits[0].description).toStrictEqual(description);
        expect(account.credits[0].amount).toStrictEqual(amount);
        expect(account.credits[0].transactionDate.value).toBe(transactionDate.value);
    }
});
