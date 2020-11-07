import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SharedModule } from '@app/core/shared/SharedModule';
import { AccountModule } from '@app/core/account/infrastructure/AccountModule';
import { CustomerModule } from '@app/core/customer/infrastructure/CustomerModule';
import { ControllerModule } from './controller/ControllerModule';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        SharedModule,
        CustomerModule,
        AccountModule,
        ControllerModule,
    ],
})
export class HTTPModule {}
