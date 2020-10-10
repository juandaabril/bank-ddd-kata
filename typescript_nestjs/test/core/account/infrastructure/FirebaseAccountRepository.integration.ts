import { Test } from '@nestjs/testing';
import {FirebaseAccountRepository} from "../../../../src/core/account/infrastructure/FirebaseAccountRepository";
import {FirebaseClient} from "../../../../src/core/shared/infrastructure/FirebaseClient";
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

