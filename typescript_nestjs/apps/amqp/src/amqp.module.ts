import { Module } from '@nestjs/common';
import { AmqpController } from './amqp.controller';
import { AmqpService } from './amqp.service';

@Module({
  imports: [],
  controllers: [AmqpController],
  providers: [AmqpService],
})
export class AmqpModule {}
