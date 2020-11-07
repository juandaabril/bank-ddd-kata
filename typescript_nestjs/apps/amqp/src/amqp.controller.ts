import { Controller, Get } from '@nestjs/common';
import { AmqpService } from './amqp.service';

@Controller()
export class AmqpController {
  constructor(private readonly amqpService: AmqpService) {}

  @Get()
  getHello(): string {
    return this.amqpService.getHello();
  }
}
