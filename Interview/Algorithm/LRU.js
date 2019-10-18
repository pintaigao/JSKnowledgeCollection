// let head = null;
// let tail = null;

// class LRUCache {
//     constructor(capacity) {
//         this.cache = {};
//         this.capacity = capacity;
//     }

//     /* 第一个要实现的方程 */

//     get(key) {
//         if (this.cache[key]) {
//             let target = this.cache[key];
//             this.update(target);
//             return target.value
//         } else {
//             return -1;
//         }
//     };

//     /* 第二个要实现的方程 */
//     put(key, value) {
//         if (this.cache[key] !== undefined) {
//             let target = this.cache[key];
//             target.value = value;
//             this.update(target);
//         }
//         else {
//             if (this.capacity == 0)
//                 return;
//             if (Object.keys(this.cache).length === this.capacity) {
//                 delete this.cache[head.key];
//                 this.removeHead();
//             }
//             let node = new DoubleLinkedList(key, value);
//             this.append(node);
//             this.cache[key] = node;
//         }

//         if(key === 3) {
//             console.log(this.cache);
//         }
//     }

//     /* Function 1: Remove the head of linkedlist */
//     removeHead() {
//         if (tail === head) {
//             head = null;
//             tail = null;
//         } else {
//             head = head.right;
//             head.left = null;
//         }
//     }

//     /* Update base off LRU used case */
//     update(node) {
//         // no need to update if accessing the most revently used value.
//         if (tail === node) {
//             return;
//         } else {
//             // remove from current postion and update nodes (if any) on both sides.
//             if (node != head) {
//                 node.left.right = node.right;
//             } else {
//                 head = node.right;
//             }
//             node.right.left = node.left;
//             // append to tail.
//             this.append(node);
//         }
//     }

//     append(node) {
//         // inserting the first node.
//         if (head == null && tail == null) {
//             head = node;
//             tail = node;
//             // appned as tail and update tail reference.
//         } else {
//             node.right = null;
//             node.left = tail;
//             tail.right = node;
//             tail = node;
//         }
//     };

// }


// class DoubleLinkedList {
//     constructor(key, value) {
//         this.key = key;
//         this.value = value;
//         this.left = null;
//         this.right = null;
//     }
// }



/* Test Case */
let obj = new LRUCache(2);
obj.put(1, 1);
obj.put(2, 2);
console.log(obj.get(1));
obj.put(3, 3);
console.log(obj.get(2));
obj.put(4, 4);
console.log(obj.get(1));
console.log(obj.get(3));
console.log(obj.get(4));

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.map = {};
    this.capacity = capacity;
    this.head = null;
    this.tail = null;
    this.update = function (node) {
        if (this.tail === node) {
            return;
        } else {
            if ( node === head ){
                head = head.right;
            }else {
                node.left.right = node.right;
            }
            node.right.left = node.left;
            this.append(node);
        }
    }

    this.removeHead = function () {
        if(tail == head) {
            head == null;
            tail == null;
        }
        head = head.right;
        head.left = null;
    }

    this.append = function (node) {
        if(head === null && tail === null) {
            head = node;
            tail = node;
        } else {
            tail.right = node;
            node.left = tail;
            node.right = null;
            tail = node;
        }

    }
}

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    if (this.map[key] !== undefined) {
        let target = this.map[key];
        this.update(target);
        return target.value;
    } else {
        return -1;
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    if (this.map[key] !== undefined) {
        let target = this.map[key];
        target.value = value;
        this.update(target)
    } else {
        if (this.capacity === 0) {
            return;
        };
        if (Object.keys(map).length === this.capacity) {
            this.removeHead();
            delete this.map[this.head.value];
        }
        let node = new Node(key, value);
        map[key] = node;
        append(key, value);
    }
};

let Node = function (key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
}