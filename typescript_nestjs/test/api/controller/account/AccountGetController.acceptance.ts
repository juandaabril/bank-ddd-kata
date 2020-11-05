import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {MainModule} from "../../../../src/http/modules/MainModule";

describe('AccountGetController (acceptance)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [MainModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    test('/account/:accountId/customer/:customerId (get)', () => {

        const accountId = '913a4482-84a0-4d1f-a333-e3f05bc66a98';
        const customerId = 'd7121dd1-0a47-4704-8840-76af08d7488e';

        return request(app.getHttpServer())
            .get(`/account/${accountId}/customer/${customerId}`)
            .expect(200)
            .expect({
                accountId: '913a4482-84a0-4d1f-a333-e3f05bc66a98',
                customerId: 'd7121dd1-0a47-4704-8840-76af08d7488e',
                balance: 0,
                status: 'OPEN',
                openingDate: '01/01/2020',
                debits: [],
                credits: []
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
