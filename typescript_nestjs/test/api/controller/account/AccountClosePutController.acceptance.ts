import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {MainModule} from "../../../../src/http/modules/MainModule";

describe('AccountClosePutController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [MainModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    test('/account/close/', () => {
        return request(app.getHttpServer())
            .put('/account/close')
            .send({accountId: '2', customerId: '2'})
            .expect(20);
    });
});
