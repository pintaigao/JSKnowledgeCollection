var G = require("./Base-Graph");
function findMotherVertex(g) {
    let nodeNumber = g.vertices;
    for (let i = 0; i < nodeNumber; i++) {
        let count = dfs(g, i);
        // console.log(count, i);
        if (count === nodeNumber) {
            return i;
        }
    }
    //Write code here
    return - 1;
}

function dfs(g, source) {
    let stack = [source];
    let visit = []
    let count = 0;
    while (stack.length) {
        let currentNode = stack.pop();
        let temp = g.list[currentNode];
        count += 1;
        for (let node of temp) {
            if (visit[node]) {
                continue;
            }
            visit[node] = true;
            stack.push(node);
        }
    }
    return count;
}

let Graph = G.Graph;
let graphs = new Graph(4);
graphs.addEdge(3, 0);
graphs.addEdge(3, 1);
graphs.addEdge(0, 1);
graphs.addEdge(1, 2);

console.log(findMotherVertex(graphs));


