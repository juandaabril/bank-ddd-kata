import { DomainEvent } from '../../shared/bus/domain/DomainEvent';
import { CustomerPrimitives } from './Customer';

export class CustomerWasCreated extends DomainEvent {
    private _customerId: string;
    private _identification: string;
    private _firstName: string;
    private _lastName: string;
    private _mobilePhone: string;

    constructor({
        customerId,
        identification,
        firstName,
        lastName,
        mobilePhone,
    }: CustomerPrimitives) {
        super();
        this._customerId = customerId;
        this._identification = identification;
        this._firstName = firstName;
        this._lastName = lastName;
        this._mobilePhone = mobilePhone;
    }
}
