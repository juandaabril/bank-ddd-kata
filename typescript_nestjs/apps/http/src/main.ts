import { NestFactory } from '@nestjs/core';
import { HTTPModule } from './HTTPModule';

async function bootstrap() {
    const app = await NestFactory.create(HTTPModule);
    await app.listen(3000);
}
bootstrap();
