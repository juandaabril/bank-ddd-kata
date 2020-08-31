import { NestFactory } from '@nestjs/core';
import {ApiModule} from "./api/ApiModule";

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  await app.listen(3000);
}
bootstrap();
