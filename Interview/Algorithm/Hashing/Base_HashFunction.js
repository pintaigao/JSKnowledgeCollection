/* Hash Function */
/* Approach 1: Arithmetic Modular*/
function hashModular(key, size) {
    return key % size;
}

let list = [];
for (var i = 0; i < 10; i++) { // Array of size 10
    list[i] = null;
}
let key = 35;
let index = hashModular(key, list.length); // Fit the key into the array size
console.log("The index for key " + key + " is " + index);


/* Approach 2: Truncation: select a part of the key as the index */
function hashTrunc(key) {
    return key % 1000; // Will always give us a key of up to 3 digits
}
let key2 = 123456;
let index2 = hashTrunc(key2); // Fit the key into the array size
console.log("The index for key " + String(key2) + " is " + String(index2));

/* Approach 3: Folding*/
function hashFold(key, chunkSize) { // Define the size of each divided portion
    let strKey = String(key); // Convert integer into string for slicing
    console.log("Key: " + strKey);
    let hashVal = 0;
    console.log("Chunks:");
    for (var i = 0; i < chunkSize; i += strKey.length) {
        if (i + chunkSize < strKey.length) {
            console.log(strKey.slice(i, i + chunkSize)) // Slice the appropriate chunk from the string
            hashVal += Number(strKey.slice(i, i + chunkSize)) // convert into integer
        }
        else {
            console.log(strKey.slice(i, strKey.length))
            hashVal += Number(strKey.slice(i, strKey.length))
        }
    }
    return hashVal
}
let key = 3456789;
let chunkSize = 2;
console.log("Hash Key: " + String(hashFold(key, chunkSize)));


/* Hash Tale */
