import { instance, mock, when } from 'ts-mockito';
import { DateService } from '@app/core/shared/base/domain/DateService';
import { DateValueObjectMother } from '../../shared/base/domain/DateValueObjectMother';
import { AccountRepository } from '@app/core/account/domain/AccountRepository';
import { RegisterNewAccount } from '@app/core/account/application/RegisterNewAccount';
import { CustomerIdMother } from '../../customer/domain/CustomerIdMother';
import { AccountIdMother } from '../domain/AccountIdMother';
import { AccountId } from '@app/core/account/domain/AccountId';
import { CustomerId } from '@app/core/customer/domain/CustomerId';
import { InMemoryAccountRepository } from '@app/core/account/infrastructure/repository/InMemoryAccountRepository';
import { DateValueObject } from '@app/core/shared/base/domain/DateValueObject';
import { MoneyValueObject } from '@app/core/shared/base/domain/MoneyValueObject';
import { AccountStatus } from '@app/core/account/domain/AccountStatus';

describe('RegisterNewAccount should', () => {

    let accountRepository: AccountRepository;
    let dateService: DateService;
    let registerNewAccount: RegisterNewAccount;

    test('create a new account', async () => {
        const openingDate = DateValueObjectMother.random();
        const customerId = CustomerIdMother.random();
        const accountId = AccountIdMother.random();

        given_a_use_case();
        and_a_date_with_this_value(openingDate);

        await when_execute_the_use_case_with(accountId, customerId);

        await then_store_method_was_called_with(accountId, customerId, openingDate);
    });

    function given_a_use_case() {
        accountRepository = new InMemoryAccountRepository();
        dateService = mock<DateService>();

        registerNewAccount = new RegisterNewAccount(
            accountRepository,
            instance(dateService),
        );
    }

    function and_a_date_with_this_value(date: DateValueObject) {
        when(dateService.today()).thenResolve(date);
    }

    async function when_execute_the_use_case_with(accountId: AccountId, customerId: CustomerId) {
        await registerNewAccount.execute(accountId, customerId);
    }

    async function then_store_method_was_called_with(accountId: AccountId, customerId: CustomerId, dateValueObject: DateValueObject) {
        const account = await accountRepository.findById(accountId);

        expect(account).not.toBeNull();
        expect(account.id).toStrictEqual(accountId);
        expect(account.customerId).toStrictEqual(customerId);
        expect(account.openingDate).toBeEquals(dateValueObject);
        expect(account.balance).toBeEquals(new MoneyValueObject(0));
        expect(account.status).toBe(AccountStatus.OPEN);
    }
});
