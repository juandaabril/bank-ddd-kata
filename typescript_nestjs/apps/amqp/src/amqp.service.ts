import { Injectable } from '@nestjs/common';

@Injectable()
export class AmqpService {
  getHello(): string {
    return 'Hello World!';
  }
}
