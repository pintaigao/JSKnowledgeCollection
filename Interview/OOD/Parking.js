/* Design a parking lot */
// Enum Type
const VechileType = {
    CAR: "CAR",
    TRUCK: "TRUCK",
    ELECTRIC: "ELECTRIC",
    VAN: "VAN",
    MOTORBIKE: "MOTORBIKE"
}

const ParkingSpotType = {
    HANDICAPPED: "HANDICAPPED",
    COMPACT: "COMPACT",
    LARGE: "LARGE",
    MOTORBIKE: "MOTORBIKE",
    ELECTRIC: "ELECTRIC"
}


const AccountStatus = {
    ACTIVE: "ACTIVE",
    BLOCKED: "BLOCKED",
    BANNED: "BANNED",
    COMPROMISED: "COMPROMISED",
    ARCHIVED: "ARCHIVED",
    UNKNOWN: "UNKNOWN"
}

const ParkingTicketStatus = {
    ACTIVE: "ACTIVE",
    PAID: "PAID",
    LOST: "LOST"
}

class Address {
    constructor(streetAddress, city, state, zipCode, country) {
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.country = country;
    }
}

class Person {
    constructor(name, address, email, phone) {
        this.name;
        this.address;
        this.email;
        this.phone;
    }
}


class Account {
    constructor(username, password, status, person) {
        this.username;
        this.password;
        this.status;
        this.person;
    }

    resetPassword() { };
}

class Admin extends Account {
    addParkingFloor(floor){};
    addParkingSpot(floorName,spot){};
    addParkingDisplayBoard(floorName,displayBoard){};
    addCustomerInfoPanel(floorName,infoPanel){};
    addEntrancePanel(entrancePanel){};
    addExitPanel(exitPanel){};
}

class ParkingAttendant extends Account {
    processTicket(TicketNumber){};
}