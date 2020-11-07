import { DomainEvent } from '../../bus/domain/DomainEvent';

export abstract class AggregateRoot {

    private _domainEvents: DomainEvent[];

    constructor() {
        this._domainEvents = [];
    }

    pullDomainEvents(): DomainEvent[] {
        const events = this._domainEvents;
        this._domainEvents = [];
        return events;
    }

    record(event: DomainEvent): void {
        this._domainEvents.push(event);
    }
}
