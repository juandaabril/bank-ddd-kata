import {instance, mock, when} from "ts-mockito";
import {DateService} from "../../../../src/core/shared/domain/DateService";
import {DateValueObject} from "../../../../src/core/shared/domain/DateValueObject";
import {DateValueObjectMother} from "../../shared/domain/DateValueObjectMother";
import {AccountRepository} from "../../../../src/core/account/domain/AccountRepository";
import {RegisterANewAccount} from "../../../../src/core/account/application/RegisterANewAccount";
import {CustomerIdMother} from "../../customer/domain/CustomerIdMother";
import {AccountIdMother} from "../domain/AccountIdMother";
import {AccountId} from "../../../../src/core/account/domain/AccountId";
import {CustomerId} from "../../../../src/core/customer/domain/CustomerId";
import {InMemoryAccountRepository} from "../../../../src/core/account/infrastructure/InMemoryAccountRepository";

describe('RegisterANewAccount should', () => {

    let accountRepository: AccountRepository;
    let dateService: DateService;
    let registerANewAccount: RegisterANewAccount;

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

        registerANewAccount = new RegisterANewAccount(
            accountRepository,
            instance(dateService)
        );
    }

    function and_a_date_with_this_value(date: DateValueObject) {
        when(dateService.today()).thenResolve(date);
    }

    async function when_execute_the_use_case_with(accountId: AccountId, customerId: CustomerId) {
        await registerANewAccount.execute(accountId, customerId);
    }

    async function then_store_method_was_called_with(accountId: AccountId, customerId: CustomerId, dateValueObject: DateValueObject){
        const account = await accountRepository.findById(accountId);

        expect(account).not.toBeNull();
        expect(account.id).toStrictEqual(accountId);
        expect(account.customerId).toStrictEqual(customerId);
        expect(account.openingDate.value).toBe(dateValueObject.value);
    }
});
