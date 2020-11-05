export class DomainEvent {
    private _eventId: string;
    private _occurredOn: string;

    constructor(eventId?: string, occurredOn?: string) {
        this._eventId = eventId;
        this._occurredOn = occurredOn;
    }

    get eventId(): string {
        return this._eventId;
    }

    get occurredOn(): string {
        return this._occurredOn;
    }
}
