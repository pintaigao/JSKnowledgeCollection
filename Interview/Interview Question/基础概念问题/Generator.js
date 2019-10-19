function* weaponGenerator() {
    yield "Katana"
    yield "Wakizashi"
    yield "Kusamamo"
    while (true) {
        yield "End in dead lock";
    }
}

let iterator = weaponGenerator();
console.log(iterator.next().value);
console.log(iterator.next().done);
console.log(iterator.next());
console.log(iterator.next());

/* Yield another Generator */
function* weaponGenerator2() {
    yield "Katana"
    yield* NinjaGenerator()
    yield "Kusamamo"
}

function* NinjaGenerator() {
    yield "Another Generator 发动";
}
let iterator2 = weaponGenerator2();

console.log("Another Generator");
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());



