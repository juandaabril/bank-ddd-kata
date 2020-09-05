import {Module} from '@nestjs/common';

import {AccountPostController} from "../controller/account/AccountPostController";
import {AccountClosePutController} from "../controller/account/AccountClosePutController";
import {AccountDepositPutController} from "../controller/account/AccountDepositPutController";

@Module({
    controllers: [AccountPostController, AccountDepositPutController, AccountClosePutController]
})
export class ApiModule {
}
