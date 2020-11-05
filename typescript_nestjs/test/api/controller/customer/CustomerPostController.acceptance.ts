import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {MainModule} from "../../../../src/http/modules/MainModule";
import {CustomerMother} from "../../../core/customer/domain/CustomerMother";

describe('CustomerPostController (acceptance)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [MainModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    test('/customer', () => {
        const customer = CustomerMother.random();

        return request(app.getHttpServer())
            .post('/customer')
            .send({
                customerId: customer.id.value,
                identification: customer.identification.value,
                firstName: customer.firstName.value,
                lastName: customer.lastName.value,
                mobilePhone: customer.mobilePhone.value
            })
            .expect(201);
    });
});
