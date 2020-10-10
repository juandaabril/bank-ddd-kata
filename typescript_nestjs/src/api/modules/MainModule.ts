import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {SharedModule} from "./SharedModule";
import {AccountModule} from "./AccountModule";
import {ApiModule} from "./ApiModule";
import {CustomerModule} from "./CustomerModule";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        SharedModule,
        CustomerModule,
        AccountModule,
        ApiModule
    ]
})
export class MainModule {
}
