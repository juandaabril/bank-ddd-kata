import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {MainModule} from "../../../../src/MainModule";

describe('AccountDepositPutController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [MainModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    test('/account/deposit', () => {
        return request(app.getHttpServer())
            .put('/account/deposit')
            .send({
                "accountId": "5",
                "customerId": "3",
                "description": "test",
                "amount": 200
            })
            .expect(200);
    });
});
