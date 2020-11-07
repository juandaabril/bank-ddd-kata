import { Module } from '@nestjs/common';

import { CustomerPostController } from '../controller/customer/CustomerPostController';
import { CustomerGetController } from '../controller/customer/CustomerGetController';
import { AccountPostController } from '../controller/account/AccountPostController';
import { AccountClosePutController } from '../controller/account/AccountClosePutController';
import { AccountDepositPutController } from '../controller/account/AccountDepositPutController';
import { AccountGetController } from '../controller/account/AccountGetController';

@Module({
    controllers: [
        CustomerPostController,
        CustomerGetController,
        AccountPostController,
        AccountDepositPutController,
        AccountClosePutController,
        AccountGetController,
    ],
})
export class ControllerModule {}
