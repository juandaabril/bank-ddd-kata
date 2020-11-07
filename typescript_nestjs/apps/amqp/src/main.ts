import { NestFactory } from '@nestjs/core';
import { AmqpModule } from './amqp.module';

async function bootstrap() {
  const app = await NestFactory.create(AmqpModule);
  await app.listen(3000);
}
bootstrap();
