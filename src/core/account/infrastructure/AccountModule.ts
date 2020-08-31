import {Global, Injectable, Module} from "@nestjs/common";
import {CloseAccount} from "../application/CloseAccount";
import {DepositFundsIntoAccount} from "../application/DepositFundsIntoAccount";
import {RegisterANewAccount} from "../application/RegisterANewAccount";
import {WithdrawFundsFromAccount} from "../application/WithdrawFundsFromAccount";
import {InMemoryAccountRepository} from "./InMemoryAccountRepository";
import {LocalDateService} from "../../shared/infrastructure/LocalDateService";
import {AccountRepository, AccountRepositoryName} from "../domain/AccountRepository";
import {DateService} from "../../shared/domain/DateService";


const registerANewAccountFactory = {
    provide: RegisterANewAccount,
    useFactory: (accountRepository: AccountRepository, dateService: DateService) => {
        return new RegisterANewAccount(accountRepository, dateService);
    },
    inject: ['AccountRepository' , 'DateService'],
};


@Global()
@Module({
    providers: [
        {provide: 'DateService', useClass: LocalDateService},
        {provide: 'AccountRepository', useClass: InMemoryAccountRepository},
        registerANewAccountFactory
    ],
    exports: [
        registerANewAccountFactory
    ],
})
export class AccountModule {}
