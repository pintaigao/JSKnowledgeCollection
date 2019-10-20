var Graph = require('./Base-Graph').Graph;

function bfsTraversal(g, source) {
    let result = "";
    let num_of_vertices = g.vertices;
    let queue = [source];
    let visit = [];
    visit[source] = true;
    while (queue.length) {
        let currentSize = queue.length;
        let currentNode = queue.shift();
        for (let node of g.list[currentNode]) {
            if (visit[node]) continue;
            visit[node] = true;
            queue.push(node);
        }
        result += (parseInt(currentNode) + 1);
    }
    console.log(result);
    return result;
}

bfsTraversal(Graph.g, 0);
