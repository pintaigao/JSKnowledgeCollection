let BillItemType = {
    BASE_CHARGE, ADDITIONAL_SERVICE, FINE, OTHER
}

let VechileLogType = {
    ACCIDENT, FUELING, CLEANING_SERVICE, OIL_CHANGE, REPAIR, OTHER
}

let VanType = {
    PASSANGER, CARGO
}

let CarType = {
    ECONOMY, COMPACT, INTERMEDIATE, STANDARD, FULL_SIZE, PREMIUM, LUXURY
}

let VechileStatus = {
    AVAILABLE, RESERVED, LOANED, LOST, BEING_SERVICED, OTHER
}

let ReservationStatus = {
    ACTIVE, PENDING, CONFIRMED, COMPLETED, CANCELLED, NONE
}

let AccountStatus = {
    ACTIVE, CLOSED, CANCELED, BLACKLISTED, BLOCKED
}


let PaymentStatus = {
    UNPAID, PENDING, COMPLETED, FILLED, DECLINED, CANCELLED, ABANDONED, SETTLING, SETTLED, REFUNDED
}

class Address {
    constructor() {
        this.branchName
        this.streetAddress;
        this.city;
        this.state;
        this.zipCode;
        this.country;
    }
}

class Person {
    constructor() {
        this.name;
        this.address;
        this.email;
        this.phone;
    }
}

/* Abstract Class Account */
class Account {
    constructor() {
        this.id;
        this.password;
        this.status;
        this.Person;
    }
    resetPassword = () => { }
}

class Member extends Account {
    constructor() {

    }
}

