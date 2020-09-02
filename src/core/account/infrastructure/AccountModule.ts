import {Global, Injectable, Module} from "@nestjs/common";
import {CloseAccount} from "../application/CloseAccount";
import {DepositFundsIntoAccount} from "../application/DepositFundsIntoAccount";
import {RegisterANewAccount} from "../application/RegisterANewAccount";
import {WithdrawFundsFromAccount} from "../application/WithdrawFundsFromAccount";
import {InMemoryAccountRepository} from "./repository/InMemoryAccountRepository";
import {LocalDateService} from "../../shared/infrastructure/LocalDateService";
import {AccountRepository, AccountRepositoryName} from "../domain/AccountRepository";
import {DateService} from "../../shared/domain/DateService";
import {FirebaseAccountRepository} from "./repository/FirebaseAccountRepository";


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
        {provide: 'AccountRepository', useClass: FirebaseAccountRepository},
        registerANewAccountFactory
    ],
    exports: [
        registerANewAccountFactory
    ],
})
export class AccountModule {}
