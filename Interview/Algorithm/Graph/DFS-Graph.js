var Graph = require('./Base-Graph');

function dfsTraversal(g, source) {
    let result = "";
    let num_of_vertices = g.vertices;
    //A list to hold the history of visited nodes
    //Make a node visited whenever you push it into stack
    let visited = [];
    for (var x = 0; x < num_of_vertices; x++) {
        visited.push(false);
    }
    //Create Stack(Implemented in previous lesson) for Depth First Traversal and Push source in it
    let stack = [source];
    visited[source] = true;
    //Traverse while stack is not empty
    while (stack.length) {
        //Pop a vertex/node from stack and add it to the result
        let current_node = stack.pop();
        result += current_node + 1 + "";
        //Get adjacent vertices to the current_node from the array,
        //and if they are not already visited then push them in the stack
        let temp = g.list[current_node];
        for (let node of temp) {
            if (!visited[node]) {
                visited[node] = true;
                stack.push(node);
            }
        }
    }

    console.log(result);

    return result;
}

dfsTraversal(Graph.g, 0);