/* Binary Search Tree */
/* 1. Node */
class Node {
    constructor(value) {
        this.val = value;
        this.leftChild = null;
        this.rightChild = null;
    }
}
/* 构建一个BST Tree Class */
class BinarySearchTree {
    constructor(rootValue) {
        this.root = new Node(rootValue);
    }


}

/* Initiate the BST */
let BST = new BinarySearchTree(8);

/* 最简单的Initiate Tree的方式就是 */
let root = new Node(6);
root.leftChild = new Node(5);
root.rightChild = new Node(7);
