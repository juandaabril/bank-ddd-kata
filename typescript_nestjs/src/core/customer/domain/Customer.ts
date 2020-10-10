import {CustomerFirstName} from "./CustomerFirstName";
import {CustomerLastName} from "./CustomerLastName";
import {CustomerMobilePhone} from "./CustomerMobilePhone";
import {CustomerId} from "./CustomerId";
import {CustomerIdentification} from "./CustomerIdentification";

export class Customer {

    private _id: CustomerId;
    private _identification: CustomerIdentification;
    private _firstName: CustomerFirstName;
    private _lastName: CustomerLastName;
    private _mobilePhone: CustomerMobilePhone;

    constructor(id: CustomerId, identification: CustomerIdentification, firstName: CustomerFirstName, lastName: CustomerLastName, mobilePhone: CustomerMobilePhone) {
        this._id = id;
        this._identification = identification;
        this._firstName = firstName;
        this._lastName = lastName;
        this._mobilePhone = mobilePhone;
    }

    static create(customerId: CustomerId, identification: CustomerIdentification, firstName: CustomerFirstName, lastName: CustomerLastName, mobilePhone: CustomerMobilePhone) {
        return new Customer(
            customerId,
            identification,
            firstName,
            lastName,
            mobilePhone
        )
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
}


