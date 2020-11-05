import { Test } from '@nestjs/testing';
import {ConfigModule} from "@nestjs/config";
import {FirebaseClient} from "../../../../src/core/shared/base/infrastructure/FirebaseClient";
import {FirebaseCustomerRepository} from "../../../../src/core/customer/infrastructure/FirebaseCustomerRepository";
import {CustomerMother} from "../domain/CustomerMother";

describe('FirebaseCustomerRepository should', () => {
    let customerRepository: FirebaseCustomerRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports:[
                ConfigModule.forRoot({
                    isGlobal: true,
                }),
            ],
            providers: [
                FirebaseClient,
                FirebaseCustomerRepository
            ],
        }).compile();

        customerRepository = moduleRef.get<FirebaseCustomerRepository>(FirebaseCustomerRepository);
    });

    it('store a new customer', async () => {
        const customer = CustomerMother.random();

        await customerRepository.store(customer);

        return;
    });
});

