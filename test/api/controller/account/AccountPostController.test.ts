import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {ApiModule} from "../../../../src/api/ApiModule";

describe('AccountPostController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [ApiModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    test('/account', () => {
        return request(app.getHttpServer())
            .post('/account')
            .send({accountId: '1', customerId: '2'})
            .expect(201);
    });
});
