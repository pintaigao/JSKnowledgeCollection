let head = null;
let tail = null;

class LRUCache {
    constructor(capacity) {
        this.cache = {};
        this.capacity = capacity;
    }

    get(key) {
        if (this.cache[key]) {
            let target = this.cache[key];
            this.update(target);
            return target.value
        } else {
            return -1;
        }
    };

    /* 第二个要实现的方程 */
    put(key, value) {
        if (this.cache[key] !== undefined) {
            let target = this.cache[key];
            target.value = value;
            this.update(target);
        }
        else {
            if (this.capacity == 0)
                return;
            if (Object.keys(this.cache).length === this.capacity) {
                delete this.cache[head.key];
                this.removeHead();
            }
            let node = new DoubleLinkedList(key, value);
            this.append(node);
            this.cache[key] = node;
        }
    }

    /* Function 1: Remove the head of linkedlist */
    removeHead() {
        if (tail === head) {
            head = null;
            tail = null;
        } else {
            head = head.right;
            head.left = null;
        }
    }

    /* Update base off LRU used case */
    update(node) {
        // no need to update if accessing the most revently used value.
        if (tail === node) {
            return;
        } else {
            // remove from current postion and update nodes (if any) on both sides.
            if (node != head) {
                node.left.right = node.right;
            } else {
                head = node.right;
            }
            node.right.left = node.left;
            // append to tail.
            this.append(node);
        }
    }

    append(node) {
        // inserting the first node.
        if (head == null && tail == null) {
            head = node;
            tail = node;
            // appned as tail and update tail reference.
        } else {
            node.right = null;
            node.left = tail;
            tail.right = node;
            tail = node;
        }
    };

}


class DoubleLinkedList {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
