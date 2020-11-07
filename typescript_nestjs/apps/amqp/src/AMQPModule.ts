import { Module } from '@nestjs/common';
import { OnCustomerCreated } from './consumer/OnCustomerCreated';

@Module({
    controllers: [OnCustomerCreated],
})
export class AMQPModule {}
