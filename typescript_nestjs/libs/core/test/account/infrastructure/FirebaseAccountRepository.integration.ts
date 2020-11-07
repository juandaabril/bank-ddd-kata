import { Test } from '@nestjs/testing';
import {FirebaseAccountRepository} from "@app/core/account/infrastructure/repository/FirebaseAccountRepository";
import {FirebaseClient} from "@app/core/shared/base/infrastructure/FirebaseClient";
import {AccountMother} from "../domain/AccountMother";
import {ConfigModule} from "@nestjs/config";

describe('FirebaseAccountRepository', () => {
    let accountRepository: FirebaseAccountRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports:[
                ConfigModule.forRoot({
                    isGlobal: true,
                }),
            ],
            providers: [
                FirebaseClient,
                FirebaseAccountRepository
            ],
        }).compile();

        accountRepository = moduleRef.get<FirebaseAccountRepository>(FirebaseAccountRepository);
    });

    it('store a new account', async () => {
        const account = AccountMother.withZeroBalance();

        await accountRepository.store(account);

        return;
    });
});

