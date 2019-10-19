function juggle() {
    let result = 0;
    for (let n = 0; n < arguments.length; n++) {
        result += arguments[n];
    }
    this.result = result;
}

let ninja1 = {};
juggle.apply(ninja1, [1, 2, 3, 4]);

let ninja2 = {};
juggle.call(ninja2, 1, 2, 3, 4);

console.log(ninja1);
console.log(ninja2);
