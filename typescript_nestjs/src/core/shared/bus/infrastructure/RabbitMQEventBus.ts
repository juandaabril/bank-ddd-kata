import {Injectable} from "@nestjs/common";
import { EventBus } from '../domain/EventBus';
import { DomainEvent } from '../domain/DomainEvent';

@Injectable()
export class RabbitMQEventBus implements EventBus {
    publish(events: DomainEvent[]): Promise<void> {
        console.log(events);
        return Promise.resolve(undefined);
    }
}

