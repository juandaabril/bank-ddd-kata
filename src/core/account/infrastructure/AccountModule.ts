import {Global, Injectable, Module} from "@nestjs/common";
import {CloseAccount} from "../application/CloseAccount";
import {DepositFundsIntoAccount} from "../application/DepositFundsIntoAccount";
import {RegisterNewAccount} from "../application/RegisterNewAccount";
import {WithdrawFundsFromAccount} from "../application/WithdrawFundsFromAccount";
import {InMemoryAccountRepository} from "./repository/InMemoryAccountRepository";
import {LocalDateService} from "../../shared/infrastructure/LocalDateService";
import {AccountRepository, AccountRepositoryName} from "../domain/AccountRepository";
import {DateService} from "../../shared/domain/DateService";
import {FirebaseAccountRepository} from "./repository/FirebaseAccountRepository";

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

@Global()
@Module({
    providers: [
        accountRepository,
        registerANewAccount,
        depositFundsIntoAccount,
        closeAccount
    ],
    exports: [
        accountRepository,
        registerANewAccount,
        depositFundsIntoAccount,
        closeAccount
    ],
})
export class AccountModule {
}
