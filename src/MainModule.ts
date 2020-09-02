import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {SharedModule} from "./core/shared/infrastructure/SharedModule";
import {AccountModule} from "./core/account/infrastructure/AccountModule";
import {ApiModule} from "./api/ApiModule";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        SharedModule,
        AccountModule,
        ApiModule
    ]
})
export class MainModule {
}
