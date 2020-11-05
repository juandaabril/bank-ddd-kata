import {Global, Module} from "@nestjs/common";
import {CloseAccount} from "../../core/account/application/CloseAccount";
import {DepositFundsIntoAccount} from "../../core/account/application/DepositFundsIntoAccount";
import {RegisterNewAccount} from "../../core/account/application/RegisterNewAccount";
import {AccountRepository} from "../../core/account/domain/AccountRepository";
import {DateService} from "../../core/shared/base/domain/DateService";
import {FirebaseAccountRepository} from "../../core/account/infrastructure/FirebaseAccountRepository";
import {GetAccountDetails} from "../../core/account/infrastructure/GetAccountDetails";

//repositories
const accountRepository = {provide: 'AccountRepository', useClass: FirebaseAccountRepository};

//use cases
const registerANewAccount = {
    provide: RegisterNewAccount,
    useFactory: (accountRepository: AccountRepository, dateService: DateService) => {
        return new RegisterNewAccount(accountRepository, dateService);
    },
    inject: ['AccountRepository', 'DateService'],
};

const depositFundsIntoAccount = {
    provide: DepositFundsIntoAccount,
    useFactory: (accountRepository: AccountRepository, dateService: DateService) => new DepositFundsIntoAccount(accountRepository, dateService),
    inject: ['AccountRepository', 'DateService'],
};

const closeAccount = {
    provide: CloseAccount,
    useFactory: (accountRepository: AccountRepository) => new CloseAccount(accountRepository),
    inject: ['AccountRepository']
};

const getAccountDetails = {
    provide: GetAccountDetails,
    useFactory: (accountRepository: AccountRepository) => new GetAccountDetails(accountRepository),
    inject: ['AccountRepository']
};

@Global()
@Module({
    providers: [
        accountRepository,
        registerANewAccount,
        depositFundsIntoAccount,
        closeAccount,
        getAccountDetails
    ],
    exports: [
        accountRepository,
        registerANewAccount,
        depositFundsIntoAccount,
        closeAccount,
        getAccountDetails
    ],
})
export class AccountModule {
}
