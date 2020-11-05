import { CustomerFirstName } from './CustomerFirstName';
import { CustomerLastName } from './CustomerLastName';
import { CustomerMobilePhone } from './CustomerMobilePhone';
import { CustomerId } from './CustomerId';
import { CustomerIdentification } from './CustomerIdentification';
import { AggregateRoot } from '../../shared/base/domain/AggregateRoot';
import { CustomerWasCreated } from './CustomerWasCreated';

export class Customer extends AggregateRoot {

    private _id: CustomerId;
    private _identification: CustomerIdentification;
    private _firstName: CustomerFirstName;
    private _lastName: CustomerLastName;
    private _mobilePhone: CustomerMobilePhone;

    constructor(id: CustomerId, identification: CustomerIdentification, firstName: CustomerFirstName, lastName: CustomerLastName, mobilePhone: CustomerMobilePhone) {
        super();
        this._id = id;
        this._identification = identification;
        this._firstName = firstName;
        this._lastName = lastName;
        this._mobilePhone = mobilePhone;
    }

    static create(customerId: CustomerId, identification: CustomerIdentification, firstName: CustomerFirstName, lastName: CustomerLastName, mobilePhone: CustomerMobilePhone) {
        const customer = new Customer(
            customerId,
            identification,
            firstName,
            lastName,
            mobilePhone,
        );
        customer.record(
            new CustomerWasCreated(
                customer.toPrimitives(),
            ),
        );

        return customer;
    }

    get id(): CustomerId {
        return this._id;
    }

    get identification(): CustomerIdentification {
        return this._identification;
    }

    get firstName(): CustomerFirstName {
        return this._firstName;
    }

    get lastName(): CustomerLastName {
        return this._lastName;
    }

    get mobilePhone(): CustomerMobilePhone {
        return this._mobilePhone;
    }

    private toPrimitives(): CustomerPrimitives {
        return {
            customerId: this.id.value,
            identification: this.identification.value,
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            mobilePhone: this.mobilePhone.value,
        };
    }
}

export type CustomerPrimitives = {
    customerId: string;
    identification: string;
    firstName: string;
    lastName: string;
    mobilePhone: string;
};


