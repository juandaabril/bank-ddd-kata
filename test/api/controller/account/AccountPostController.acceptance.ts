import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {MainModule} from "../../../../src/api/modules/MainModule";

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
        return request(app.getHttpServer())
            .post('/account')
            .send({accountId: '5', customerId: '3'})
            .expect(201);
    });
});
