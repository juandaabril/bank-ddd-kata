import {Module} from '@nestjs/common';

import {AccountPostController} from "./controller/account/AccountPostController";
import {AccountModule} from "../core/account/infrastructure/AccountModule";
import {SharedModule} from "../core/shared/infrastructure/SharedModule";
import {ConfigModule} from "@nestjs/config";
import {AccountClosePutController} from "./controller/account/AccountClosePutController";
import {AccountDepositPutController} from "./controller/account/AccountDepositPutController";

@Module({
    controllers: [AccountPostController, AccountDepositPutController, AccountClosePutController]
})
export class ApiModule {
}
