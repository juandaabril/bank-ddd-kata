import { Global, Module } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { FirebaseClient } from './base/infrastructure/FirebaseClient';
import { LocalDateService } from './base/infrastructure/LocalDateService';
import { RabbitMQEventBus } from './bus/infrastructure/RabbitMQEventBus';

const EventBus = {
    provide: 'EventBus',
    useFactory: (rabbitMQClient: ClientProxy) => {
        return new RabbitMQEventBus(rabbitMQClient);
    },
    inject: ['RabbitMQClient'],
};

const DateService = { provide: 'DateService', useClass: LocalDateService };

@Global()
@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'RabbitMQClient',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://admin:admin@localhost:5672'],
                    queue: 'events',
                    queueOptions: { durable: true },
                },
            },
        ]),
    ],
    providers: [FirebaseClient, EventBus, DateService],
    exports: [FirebaseClient, EventBus, DateService],
})
export class SharedModule {}
