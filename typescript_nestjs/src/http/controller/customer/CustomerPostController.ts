import { Body, Controller, Post } from '@nestjs/common';
import { CustomerId } from '../../../core/customer/domain/CustomerId';
import { CreateCustomer } from '../../../core/customer/application/CreateCustomer';
import { CustomerIdentification } from '../../../core/customer/domain/CustomerIdentification';
import { CustomerFirstName } from '../../../core/customer/domain/CustomerFirstName';
import { CustomerLastName } from '../../../core/customer/domain/CustomerLastName';
import { CustomerMobilePhone } from '../../../core/customer/domain/CustomerMobilePhone';

export class Request {
    customerId: string;
    identification: string;
    firstName: string;
    lastName: string;
    mobilePhone: string;
}

@Controller('/customer')
export class CustomerPostController {
    constructor(
        private createCustomer: CreateCustomer,
    ) {
    }

    @Post()
    run(@Body() request: Request): Promise<void> {
        console.log(request);
        const customerId = new CustomerId(request.customerId);
        const identification = new CustomerIdentification(request.identification);
        const firstName = new CustomerFirstName(request.firstName);
        const lastName = new CustomerLastName(request.lastName);
        const mobilePhone = new CustomerMobilePhone(request.mobilePhone);

        return this.createCustomer.execute(
            customerId,
            identification,
            firstName,
            lastName,
            mobilePhone,
        );
    }
}

