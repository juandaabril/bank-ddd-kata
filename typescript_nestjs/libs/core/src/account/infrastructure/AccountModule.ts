import { Global, Module } from '@nestjs/common';
import { RegisterNewAccount } from '../application/RegisterNewAccount';
import { AccountRepository } from '../domain/AccountRepository';
import { FirebaseAccountRepository } from './repository/FirebaseAccountRepository';
import { DateService } from '../../shared/base/domain/DateService';
import { DepositFundsIntoAccount } from '../application/DepositFundsIntoAccount';
import { CloseAccount } from '../application/CloseAccount';
import { GetAccountDetails } from '../application/GetAccountDetails';

//repositories
const accountRepository = {
    provide: 'AccountRepository',
    useClass: FirebaseAccountRepository,
};

//use cases
const registerANewAccount = {
    provide: RegisterNewAccount,
    useFactory: (
        accountRepository: AccountRepository,
        dateService: DateService,
    ) => {
        return new RegisterNewAccount(accountRepository, dateService);
    },
    inject: ['AccountRepository', 'DateService'],
};

const depositFundsIntoAccount = {
    provide: DepositFundsIntoAccount,
    useFactory: (
        accountRepository: AccountRepository,
        dateService: DateService,
    ) => new DepositFundsIntoAccount(accountRepository, dateService),
    inject: ['AccountRepository', 'DateService'],
};

const closeAccount = {
    provide: CloseAccount,
    useFactory: (accountRepository: AccountRepository) =>
        new CloseAccount(accountRepository),
    inject: ['AccountRepository'],
};

const getAccountDetails = {
    provide: GetAccountDetails,
    useFactory: (accountRepository: AccountRepository) =>
        new GetAccountDetails(accountRepository),
    inject: ['AccountRepository'],
};

@Global()
@Module({
    providers: [
        accountRepository,
        registerANewAccount,
        depositFundsIntoAccount,
        closeAccount,
        getAccountDetails,
    ],
    exports: [
        accountRepository,
        registerANewAccount,
        depositFundsIntoAccount,
        closeAccount,
        getAccountDetails,
    ],
})
export class AccountModule {}
