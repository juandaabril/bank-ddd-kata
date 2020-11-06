import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MainModule } from '../../../../src/http/modules/MainModule';
import { AccountMother } from '../../../core/account/domain/AccountMother';

describe('AccountPostController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [MainModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    test('/account', () => {
        const account = AccountMother.withZeroBalance();


        return request(app.getHttpServer())
            .post('/account')
            .send({ accountId: account.id.value, customerId: account.customerId.value })
            .expect(201);
    });
});
