import {Module} from '@nestjs/common';

import {AccountPostController} from "./controller/account/AccountPostController";
import {AccountModule} from "../core/account/infrastructure/AccountModule";
import {SharedModule} from "../core/shared/infrastructure/SharedModule";
import {ConfigModule} from "@nestjs/config";

@Module({
    controllers: [AccountPostController]
})
export class ApiModule {
}
