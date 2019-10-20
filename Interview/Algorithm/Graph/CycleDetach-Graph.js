//You can check the input graphs in console tab

//Create Stack => let stack = new Stack(5), where 5 is the size of the stack
//Functions of Stack => stack.push(int), stack.pop(), getTop(), isEmpty() 
//class Graph => {int vertices, linkedList[] list}
//class linkedList => {Node head}
//class Node => {int data, Node nextElement}
var G = require("./Base-Graph");

function detectCycle(g, source) {
    //Write code here   
    let underGoing = [].fill(0);
    let nodeNumber = g.vertices;
    let stack = [source];
    while (stack.length) {
        let currentNode = stack.pop();
        if (underGoing[currentNode] === -1) {
            return true;
        }
        underGoing[currentNode] = -1;
        console.log(underGoing);
        let tempArray = g.list[currentNode];
        for (let node of tempArray) {
            stack.push(node);
        }
    }
    return false;
}

let Graph = G.Graph;
let graphs = new Graph(3);
graphs.addEdge(0, 1);
graphs.addEdge(1, 2);
// graphs.addEdge(2, 0);

console.log(detectCycle(graphs, 0));


