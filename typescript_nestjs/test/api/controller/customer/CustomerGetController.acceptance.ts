import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {MainModule} from "../../../../src/api/modules/MainModule";

describe('CustomerGetController (acceptance)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [MainModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    test('/customerId (get)', () => {

        const customerId = '117d9453-3272-4d39-945e-b03c7efbfdfa';

        return request(app.getHttpServer())
            .get(`/customer/${customerId}`)
            .expect(200)
            .expect({
                id: '117d9453-3272-4d39-945e-b03c7efbfdfa',
                identification: 'hzgoy6jhdz',
                firstName: 'Heloise',
                lastName: 'Jacobi',
                mobilePhone: '946-785-5481 x957'
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
