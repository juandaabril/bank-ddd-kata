import { NestFactory } from '@nestjs/core';
import {MainModule} from "./http/modules/MainModule";

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  await app.listen(3000);
}
bootstrap();
