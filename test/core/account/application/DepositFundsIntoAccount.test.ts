import {instance, mock, when} from "ts-mockito";
import {DateService} from "../../../../src/core/shared/domain/DateService";
import {DateValueObject} from "../../../../src/core/shared/domain/DateValueObject";
import {DateValueObjectMother} from "../../shared/domain/DateValueObjectMother";
import {AccountMother} from "../domain/AccountMother";
import {AccountRepository} from "../../../../src/core/account/domain/AccountRepository";
import {Account} from "../../../../src/core/account/domain/Account";
import {DepositFundsIntoAccount} from "../../../../src/core/account/application/DepositFundsIntoAccount";
import {AccountId} from "../../../../src/core/account/domain/AccountId";
import {CustomerId} from "../../../../src/core/customer/domain/CustomerId";
import {Amount} from "../../../../src/core/account/domain/Amount";
import {DescriptionMother} from "../domain/DescriptionMother";
import {Description} from "../../../../src/core/account/domain/Description";
import {InMemoryAccountRepository} from "../../../../src/core/account/infrastructure/InMemoryAccountRepository";

describe('DepositFundsIntoAccount should', () => {

    let accountRepository: AccountRepository;
    let dateService: DateService;
    let depositFundsIntoAccount: DepositFundsIntoAccount;

    test('add a debit into the account', async () => {
        const account = AccountMother.withZeroBalance();
        const transactionDate = DateValueObjectMother.random();
        const description = DescriptionMother.random();
        const amount = new Amount(100);

        given_a_use_case();
        and_a_date_with_this_value(transactionDate);
        await and_a_account_with_this_data(account);

        await when_a_deposit_is_make(account.id, account.customerId, description, amount);

        await then_the_accounts_has_this_data(account.id, account.customerId, description, amount, transactionDate);
    });

    function given_a_use_case() {
        accountRepository = new InMemoryAccountRepository();
        dateService = mock<DateService>();

        depositFundsIntoAccount = new DepositFundsIntoAccount(
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

    async function when_a_deposit_is_make(accountId: AccountId, customerId: CustomerId, description: Description, amount: Amount) {
        await depositFundsIntoAccount.execute(accountId, customerId, description, amount);
    }

    async function then_the_accounts_has_this_data(accountId: AccountId, customerId: CustomerId, description: Description, amount: Amount, transactionDate: DateValueObject) {
        const account = await accountRepository.findById(accountId);

        expect(account).not.toBeNull();
        expect(account.id).toStrictEqual(accountId);
        expect(account.customerId).toStrictEqual(customerId);
        expect(account.debits.length).toBe(1);
        expect(account.debits[0].description).toStrictEqual(description);
        expect(account.debits[0].amount).toStrictEqual(amount);
        expect(account.debits[0].transactionDate.value).toBe(transactionDate.value);
    }
});
