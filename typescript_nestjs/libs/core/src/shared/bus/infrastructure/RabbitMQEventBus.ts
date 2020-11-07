import { Injectable } from '@nestjs/common';
import { EventBus } from '../domain/EventBus';
import { DomainEvent } from '../domain/DomainEvent';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQEventBus implements EventBus {
    private rabbitMQClient: ClientProxy;

    constructor(rabbitMQClient: ClientProxy) {
        this.rabbitMQClient = rabbitMQClient;
    }

    async publish(events: DomainEvent[]): Promise<void> {
        try {
            await this.rabbitMQClient
                .emit('customer-was-creadted', '{data: your data}')
                .toPromise();
        } catch (e) {
            console.log(e);
        }
        console.log(events);
        return Promise.resolve(undefined);
    }
}
