class Node {
    constructor(data) {
        this.data = data;
        this.nextElement = null;
    }
}
function Node2(data) {
    this.data = data;
    this.nextElement = null;
}

class LinkedList {
    constructor() {
        // head will be at the top of the list, head 是永远不会变的
        this.head = new Node(-1);
        this.length = 0;
        this.tail = this.head;
    }

    isEmpty() {
        return (this.length == 0);
    }

    //Insertion At Head  
    insertAtHead(dt) {
        let tempNode = new Node(dt);
        tempNode.nextElement = this.head.nextElement;
        this.head.nextElement = tempNode;
        this.length = this.length + 1;
        return this; //returning the updated list
    }

    //Inserts a value at the end of the list  
    insertAtTail(value) {
        //Creating a new Node with value data
        let node = new Node(value);
        //Start from headNode
        let currentNode = this.head;
        //Iterate to the last element
        while (currentNode.nextElement != null) {
            currentNode = currentNode.nextElement;
        }
        //Make new node the nextElement of last node of list
        currentNode.nextElement = node;
        list.length = list.length + 1;
        return list;
    }
}

LinkedList.prototype.printList = function () {
    //function to print the linked list
    if (this.isEmpty()) {
        console.log("Empty List");
        return false;
    }
    else {
        let temp = this.head.nextElement
        while (temp != null) {
            process.stdout.write(String(temp.data));
            process.stdout.write(" -> ");
            temp = temp.nextElement;
        }
        process.stdout.write("null");
        return true;
    }
}

/* Test insert node at head */
let list = new LinkedList();
// for (i = 0; i < 10; i++) {
//     list = list.insertAtHead(i);
// }
// list.printList() //will print the list
/* Insert at tail */
list.insertAtTail(0);
list.insertAtTail(1);
list.insertAtTail(2);
list.insertAtTail(3);
list.printList();


