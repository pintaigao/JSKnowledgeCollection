import { rejects } from "assert"

function PromisePH() {
    let status = {
        PENDING: "PENDING",
        FULLFILLED: "FULLFILLED",
        REJECTED: "REJECTED"
    }

    function resolve(argument){
        this[value] = argument;
        this[status] = status.FULLFILLED;
    };

    function reject(){
        this[value] = arguments[0];
        this.status = status.REJECTED;
    };

    class MyPromise {
        constructor(resolver){
            this["value"] = status.PENDING;
            resolver()
        }
    }

}

new Promise((res, rej) => {
    res("Some things");
    rej("Some things");
})