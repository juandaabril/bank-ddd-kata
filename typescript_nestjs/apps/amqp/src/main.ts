import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AMQPModule } from './AMQPModule';

export const RABBIT_ENV = () => ({
    RABBIT_HOST: process.env.RABBIT_HOST,
    RABBIT_PORT: process.env.RABBIT_PORT,
    RABBIT_USER: process.env.RABBIT_USER,
    RABBIT_PASSWORD: process.env.RABBIT_PASSWORD,
});

async function bootstrap() {
    const env = RABBIT_ENV();
    console.log(env);
    console.log(process.env);
    const app = await NestFactory.createMicroservice(AMQPModule, {
        transport: Transport.RMQ,
        options: {
            urls: [
                `amqp://${env.RABBIT_USER}:${env.RABBIT_PASSWORD}@${env.RABBIT_HOST}:${env.RABBIT_PORT}}`,
            ],
            queue: 'events',
            queueOptions: {
                durable: true,
            },
        },
    });

    await app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
