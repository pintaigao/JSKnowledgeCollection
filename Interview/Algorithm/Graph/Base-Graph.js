class Graph {
    constructor(vertices) {
        //Total number of vertices in the graph
        this.vertices = vertices;
        //Defining a list which can hold LinkedLists equal to the number of vertices in the graph
        this.list = [];
        for (let i = 0; i < vertices; i++) {
            this.list.push(new Array());
        }
    }

    /* 现在这个还只是 direct graph, undirect 就是双向的了 */
    addEdge(source, destination) {
        //Since we are implementing a directed list, (0,1) is not the same as (1,0)
        this.list[source].unshift(destination);
        //If we were to implement an undirected graph where (0,1)==(1,0), 
        //we would create an additional edge from destination to source too:
        //self.list[destination].insertAtHead(source);
    }

    printGraph() {
        console.log(">>Adjacency List of Directed Graph<<");
        var i;
        for (i = 0; i < this.list.length; i++) {
            process.stdout.write("|" + String(i) + "| => ");
            let temp = this.list[i];
            for (let node of temp) {
                process.stdout.write("[" + node + "] -> ");
            }
            console.log("null");
        }
    }
}
exports.Graph = Graph;
// let g = new Graph(6);
// g.addEdge(0, 1);
// g.addEdge(0, 2);
// g.addEdge(1, 3);
// g.addEdge(1, 4);
// g.addEdge(2, 5);
// // g.addEdge(2, 5);
// // g.addEdge(5, 0);
// g.printGraph();

