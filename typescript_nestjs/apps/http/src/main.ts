import { NestFactory } from '@nestjs/core';
import { HTTPModule } from './HTTPModule';

async function bootstrap() {
    console.log(process.env);
    const app = await NestFactory.create(HTTPModule);
    await app.listen(3000);
}
bootstrap();
