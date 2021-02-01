String.prototype.hashCode = function () {
    var hash = 0;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

var threshold = 0.6;
class HashEntry {
    constructor(key, data) {
        this.key = key;
        // data to be stored
        this.value = data;
        // reference to new entry
        this.next = null;
    }
}

class HashTable {
    //Constructor
    constructor() {
        //Size of the HashTable
        this.slots = 10;
        //Current entries in the table
        //Used while resizing the table when half of the table gets filled
        this.size = 0;
        //Array of HashEntry objects (by deafult all null)
        this.bucket = [];
        for (var i = 0; i < this.slots; i++) {
            this.bucket[i] = null;
        }
    }
    //Helper Functions  
    get_size() {
        return this.size;
    }
    //Hash Function
    getIndex(key) {
        key = key.hashCode();
        let index = key % this.slots;
        return index;
    }
    isEmpty() {
        return this.get_size() == 0;
    }

    insert(key, value, resize) {
        //Find the node with the given key
        let b_Index = this.getIndex(key);
        if (this.bucket[b_Index] == null) {
            this.bucket[b_Index] = new HashEntry(key, value);
            console.log(String(key) + ", " + String(value) + " - inserted.")
        }
        else {
            let head = this.bucket[b_Index];
            while (head != null) {
                if (head.key == key) {
                    head.value = value;
                    break;
                }
                else if (head.next == null) {
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
        if (!resize && load_factor >= threshold) {
            this.resize();
        }
    }


    //Return a value for a given key
    search(key) {
        //Find the node with the given key
        let b_Index = this.getIndex(key);
        let head = this.bucket[b_Index]
        //Search key in the slots
        if (head != null) {
            while (head != null) {
                if (head.key == key) {
                    return head.value;
                }
                head = head.next
            }
        }
        //If key not found
        console.log("Key not found");
        return null;
    }

    //Remove a value based on a key
    deleteVal(key) {
        //Find index
        let b_Index = this.getIndex(key);
        let head = this.bucket[b_Index];
        //If key does not exist
        if (head == null) {
            console.log("Key not found");
            return null;
        }
        //If key exists at first slot
        if (head.key == key) {
            this.bucket[b_Index] = head.next;
            console.log("Key deleted");
            this.size -= 1;
            return this;
        }
        //Find the key in slots
        let prev = null;
        while (head != null) {
            //If key exists
            if (head.key == key) {
                prev.next = head.next;
                console.log("Key deleted");
                this.size -= 1;
                return this;
            }
            //Else keep moving in chain
            prev = head;
            head = head.next;
        }
        // If loop through but still not found the key
        console.log("Key not found");
        return null;
    }

    resize() {
        let new_slots = this.slots * 2;
        this.slots = new_slots;
        let temp_bucket = this.bucket;
        this.bucket = [];
        this.size = 0;
        for (var n = 0; n < new_slots; n++) {
            this.bucket[n] = null;
        }
        // rehash all items into new slots deep copy;
        /* 不能直接copy and paste 旧的到新的，因为hashvalue 会随着size的增大而改变 
        for (var i = 0; i < this.bucket.length; i++) {
            new_bucket[i] = this.bucket[i];
        } 
        */
        for (var i = 0; i < temp_bucket.length; i++) {
            let head = temp_bucket[i];
            while (head != null) {
                this.insert(head.key, head.value, true);
                head = head.next
            }
        }
        console.log(table);
    }
}

let table = new HashTable(); //Create a HashTable
// console.log(table.isEmpty());
table.insert("This", 1);
table.insert("is", 2)
console.log("Search Key: This" + " and Value is: " + table.search("This"));
table.insert("is20", 20)
table.insert("is12", 12)
console.log("Search Key: This" + " and Value is: " + table.search("This"));
table.insert("is22", 22)
console.log("Search Key: This" + " and Value is: " + table.search("This"));
table.insert("is32", 32)
table.insert("is42", 42)
console.log("Search Key: This" + " and Value is: " + table.search("This"));
table.insert("is52", 52)
table.insert("is62", 62)
console.log("Search Key: This" + " and Value is: " + table.search("This"));
table.insert("is72", 72)
table.insert("a3", 3)
table.insert("a", 31)
table.insert("Test", 4)
table.insert("Driver", 5)


console.log("Search Key: is32" + " and Value is: " + table.search("is32"));
console.log("Search Key: This" + " and Value is: " + table.search("This"));
console.log("Search Key: Driver" + " and Value is: " + table.search("Driver"));
console.log("Search Key: a3" + " and Value is: " + table.search("a3"));
console.log("Table Size: " + String(table.get_size()));
console.log("The value for 'is' key: " + String(table.search("is")));
table.deleteVal("is");
table.deleteVal("a");
table.deleteVal("a4");
console.log("Table Size: " + String(table.get_size()));


// let array1 = ['a', 'b', 'c', 'd'];
// let array2 = [];
// array2[0] = array1[0];
// console.log(array2);

// array1[0] = 'e';
// console.log(array2);