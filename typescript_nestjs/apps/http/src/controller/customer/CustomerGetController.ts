import {Controller, Get, Param} from '@nestjs/common';
import {CustomerId} from "@app/core/customer/domain/CustomerId";
import {CustomerDetails, GetCustomerDetails} from "@app/core/customer/application/GetCustomerDetails";

@Controller('/customer')
export class CustomerGetController {
    constructor(
        private getCustomerDetails: GetCustomerDetails
    ) {
    }

    @Get(':customerId')
    run(@Param() params): Promise<CustomerDetails> {
        const customerId = new CustomerId(params.customerId);

        return this.getCustomerDetails.execute(
            customerId
        );
    }
}

