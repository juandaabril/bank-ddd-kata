import * as firebase from "firebase";
import {CustomerId} from "../../customer/domain/CustomerId";
import {Customer} from "../domain/Customer";
import {CustomerIdentification} from "../domain/CustomerIdentification";
import {CustomerFirstName} from "../domain/CustomerFirstName";
import {CustomerLastName} from "../domain/CustomerLastName";
import {CustomerMobilePhone} from "../domain/CustomerMobilePhone";

export class CustomerMapper {

    static fromFirebase(document: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) {
        return new Customer(
            new CustomerId(document.id),
            new CustomerIdentification(document.get('identification')),
            new CustomerFirstName(document.get('firstName')),
            new CustomerLastName(document.get('lastName')),
            new CustomerMobilePhone(document.get('mobilePhone'))
        );
    }

    static toFirebase(customer: Customer) {
        return {
            id: customer.id.value,
            identification: customer.identification.value,
            firstName: customer.firstName.value,
            lastName: customer.lastName.value,
            mobilePhone: customer.mobilePhone.value
        };
    }
}
