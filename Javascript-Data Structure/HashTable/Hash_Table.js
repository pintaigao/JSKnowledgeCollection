/**
 * 1. Build a Hash Table using Bucket Chaining
 * All elements with the same hash key will be stored in an array at that index.
 * In data structures, these arrays are called buckets.
 * The size of the hash table is set as n*m where n is the number of keys it can hold, and m is the number of slots each bucket contains.
 * Each slot holds a key/value pair.
 */

// 1.A HashEntry, the key, the value and the reference to a new entry.
class HashEntry {
  constructor(key, data) {
    this.key = key;
    // data to be stored
    this.value = data;
    // reference to new entry
    this.next = null;
  }
}
let entry = new HashEntry(3, "Educative");
console.log(String(entry.key) + ", " + entry.value);
let threshold = 0.6;
// 2. Create a HashTable class which is a collection of HashEntry objects.
// Keep track of the total number of slots in the hash table and the current size of the hash table.
// These two variables​ will come in handy when we need to resize the table.
class HashTable {
  constructor() {
    //Size of the HashTable
    this.slots = 10;
    //Current entries in the table
    //Used while resizing the table when half of the table gets filled
    this.size = 0;
    //Array of HashEntry objects (by deafult all None)
    this.bucket = [];
    for (var i = 0; i < this.slots; i++) {
      this.bucket[i] = null;
    }
  }
  get_size() {
    return this.size;
  }
  isEmpty() {
    return this.get_size() == 0;
  }
  // A Hash Function
  getIndex(key) {
    let index = key % this.slots;
    return index;
  }
}

// 3.先看这个 Add a Insert Function
HashTable.prototype.insert = function (key, value) {
  //Find the node with the given key
  var threshold = 0.6;
  let b_Index = this.getIndex(key);
  if (this.bucket[b_Index] == null) {
    this.bucket[b_Index] = new HashEntry(key, value);
    console.log(String(key) + ", " + String(value) + " - inserted.");
  } else {
    // bucket[index]里面有这个，插到它后面去
    let head = this.bucket[b_Index];
    while (head != null) {
      if (head.key == key) {
        // Overwrite the value
        head.value = value;
        break;
      } else if (head.next == null) {
        head.next = new HashEntry(key, value);
        console.log(String(key) + ", " + String(value) + " - inserted.");
        break;
      }
      head = head.next;
    }
  }

  this.size += 1;
  let load_factor = Number(this.size) / Number(this.slots);
  //Checks if 60% of the entries in table are filled, threshold = 0.6
  if (load_factor >= threshold) {
    this.resize();
  }
};

// 4.再看这个 Add a Resizing Function
HashTable.prototype.resize = function () {
  let new_slots = this.slots * 2;
  let new_bucket = [];
  for (var n = 0; n < new_slots; n++) {
    new_bucket[n] = null;
  }
  this.slots = new_slots;
  // rehash all items into new slots
  for (var i = 0; i < this.bucket.length; i++) {
    let head = this.bucket[i];
    while (head != null) {
      let new_index = this.getIndex(head.key);
      if (new_bucket[new_index] == null) {
        new_bucket[new_index] = new HashEntry(head.key, head.value);
      } else {
        let node = new_bucket[new_index];
        while (node != null) {
          if (node.key == head.key) {
            node.value = head.value;
            node = null;
          } else if (node.next == null) {
            node.next = new HashEntry(head.key, head.value);
            node = null;
          } else {
            node = node.next;
          }
        }
      }
      head = head.next;
    }
  }
  this.bucket = new_bucket;
};

// Add a Search Function
//Return a value for a given key
HashTable.prototype.search = function (key) {
  //Find the node with the given key
  let b_Index = this.getIndex(key);
  let head = this.bucket[b_Index];
  //Search key in the slots
  if (head != null) {
    while (head != null) {
      if (head.key == key) {
        return head.value;
      }
      head = head.next;
    }
  }
  //If key not found
  console.log("Key not found");
  return null;
};

// Add a delete function
//Remove a value based on a key
HashTable.prototype.deleteVal = function (key) {
  //Find index
  let b_Index = this.getIndex(key);
  let head = this.bucket[b_Index];
  //If key exists at first slot
  if (head.key == key) {
    this.bucket[b_Index] = head.next;
    console.log("Key deleted");
    this.size -= 1;
    return;
  }
  //Find the key in slots
  let prev = null;
  while (head != null) {
    //If key exists
    if (head.key == key) {
      prev.next = head.next;
      console.log("Key deleted");
      this.size -= 1;
      return;
    }
    //Else keep moving in chain
    prev = head;
    head = head.next;
  }
  //If key does not exist
  console.log("Key not found");
  return;
};

// Practice
let ht = new HashTable();
console.log(ht.isEmpty());
// Current capacity
console.log(ht.slots);
ht.resize();
// New capacity
console.log(ht.slots);
// Insert into the table
ht.insert(2, "London");
console.log(ht.bucket[2].value);
ht.insert(12, "Moscow");
console.log(ht.bucket[2].next.value);
console.log("Size of the array: " + String(ht.size));
// Search in table
ht.insert(2, "London");
console.log(ht.search(2));
// Delete in table
ht.deleteVal(2);

// let table = new HashTable(); //Create a HashTable
// // console.log(table.isEmpty());
// table.insert("This", 1);
// table.insert("is", 2);
// console.log("Search Key: This" + " and Value is: " + table.search("This"));
// table.insert("is20", 20);
// table.insert("is12", 12);
// console.log("Search Key: This" + " and Value is: " + table.search("This"));
// table.insert("is22", 22);
// console.log("Search Key: This" + " and Value is: " + table.search("This"));
// table.insert("is32", 32);
// table.insert("is42", 42);
// console.log("Search Key: This" + " and Value is: " + table.search("This"));
// table.insert("is52", 52);
// table.insert("is62", 62);
// console.log("Search Key: This" + " and Value is: " + table.search("This"));
// table.insert("is72", 72);
// table.insert("a3", 3);
// table.insert("a", 31);
// table.insert("Test", 4);
// table.insert("Driver", 5);

// console.log("Search Key: is32" + " and Value is: " + table.search("is32"));
// console.log("Search Key: This" + " and Value is: " + table.search("This"));
// console.log("Search Key: Driver" + " and Value is: " + table.search("Driver"));
// console.log("Search Key: a3" + " and Value is: " + table.search("a3"));
// console.log("Table Size: " + String(table.get_size()));
// console.log("The value for 'is' key: " + String(table.search("is")));
// table.deleteVal("is");
// table.deleteVal("a");
// table.deleteVal("a4");
// console.log("Table Size: " + String(table.get_size()));

// let array1 = ['a', 'b', 'c', 'd'];
// let array2 = [];
// array2[0] = array1[0];
// console.log(array2);

// array1[0] = 'e';
// console.log(array2);
