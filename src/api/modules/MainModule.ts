import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {SharedModule} from "./SharedModule";
import {AccountModule} from "./AccountModule";
import {ApiModule} from "./ApiModule";

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
