import {CustomerFirstName} from "./CustomerFirstName";
import {CustomerLastName} from "./CustomerLastName";
import {CustomerMobilePhone} from "./CustomerMobilePhone";
import {CustomerId} from "./CustomerId";

export class Customer {

    private _identification: CustomerId;
    private _firstName: CustomerFirstName;
    private _lastName: CustomerLastName;
    private _mobilePhone: CustomerMobilePhone;

    constructor(identification: CustomerId, firstName: CustomerFirstName, lastName: CustomerLastName, mobilePhone: CustomerMobilePhone) {
        this._identification = identification;
        this._firstName = firstName;
        this._lastName = lastName;
        this._mobilePhone = mobilePhone;
    }

    get identification(): CustomerId {
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


