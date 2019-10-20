/* 
Suppose we have some input data describing a graph of relationships between parents and children over multiple generations.
The data is formatted as a list of (parent, child) pairs, where each individual is assigned a unique integer identifier.
For example, in this diagram, 3 is a child of 1 and 2, and 5 is a child of 4:

parentChildPairs = [  (1, 3), (2, 3), (3, 6), (5, 6),(5, 7), (4, 5), (4, 8), (8, 10) ]
Write a function that takes this data as input and returns two collections: one containing all individuals with zero known parents, and one containing all individuals with exactly one known parent.
findNodesWithZeroAndOneParents(parentChildPairs) =>
[ [1, 2, 4],    // Individuals with zero parents
[5, 7, 8, 10] // Individuals with exactly one parent ] */

let findNodesWithZeroAndOneParents = function (pairs) {
    let map = {};
    let set = new Set();
    // Set up a Map which is child -> [parent]
    function setUpMap(array) {
        if (map[array[1]] !== undefined) {
            map[array[1]].push(array[0]);
        }
        else {
            map[array[1]] = [array[0]]
        }
    }
    for (let array of pairs) {
        setUpMap(array);
        set.add(array[0] + "");
    }
    let result = [[], []];
    for (let key in map) {
        if (map[key].length === 1) {
            result[1].push(key);
        }

        if (set.has(key)) {
            set.delete(key);
        }
    };

    console.log(map);

    for (let key of set) {
        result[0].push(key);
    }

    console.log(result);

    return result;
}

// findNodesWithZeroAndOneParents([[1, 3], [2, 3], [3, 6], [5, 6], [5, 7], [4, 5], [4, 8], [8, 10]]);
// findNodesWithZeroAndOneParents([[1, 4], [1, 5], [2, 5], [3, 6], [6, 7]]);
// console.log("下一题");


/* 或者根本就不用Set，直接一个Map就搞定了 */
/*
第二题：
Write a function that takes the graph, as well as two of the individuals in our dataset, as its inputs and returns true if and only if they share at least one ancestor.
Sample input and output: （input和上面一样）
hasCommonAncestor(parentChildPairs, 3, 8) => false
hasCommonAncestor(parentChildPairs, 5, 8) => true
hasCommonAncestor(parentChildPairs, 6, 8) => true
hasCommonAncestor(parentChildPairs, 1, 3) => false
*/
let hasCommonAncestor = function (pairs, a, b) {
    let map = {};

    function setUpMap(array) {
        if (map[array[1]] !== undefined) {
            map[array[1]].push(array[0]);
        }
        else {
            map[array[1]] = [array[0]]
        }
    }

    // 1.Setup the map (child --> [parent]);
    for (let array of pairs) {
        setUpMap(array);
    }

    function getParent(map, num, set) {
        let list = map[num];
        if (map[num] === undefined || list.length === 0) {
            return;
        }
        for (let i of list) {
            set.add(i);
            getParent(map, i, set);
        }
    }

    let setA = new Set();
    setA.add(a);
    getParent(map, a, setA);
    console.log(setA);

    let setB = new Set();
    setB.add(b);
    getParent(map, b, setB);
    console.log(setB);

    for (let i of setB) {
        if (setA.has(i)) {
            return true;
        }
    }

    return false;
}

// console.log(hasCommonAncestor([[1, 3], [2, 3], [3, 6], [5, 6], [5, 7], [4, 5], [4, 8], [8, 10]], 3, 6));
// console.log(hasCommonAncestor([[1, 4], [1, 5], [2, 5], [3, 6], [6, 7]], 3, 6));

/*
For example, in this diagram, 3 is a child of 1 and 2, and 5 is a child of 4
Write a function that, for a given individual in our dataset, returns their earliest known ancestor -- the one at the farthest distance from the input individual. . check 1point3acres for more.
If there is more than one ancestor tied for "earliest", return any one of them. If the input individual has no parents, the function should return null (or -1).
Sample input and output:
parent_child_pairs = [ (1, 3), (2, 3), (3, 6), (5, 6), (5, 7), (4, 5), (4, 8), (8, 10), (11, 2) ]

output
findEarliestAncestor(parentChildPairs, 8) => 4
findEarliestAncestor(parentChildPairs, 7) => 4
findEarliestAncestor(parentChildPairs, 6) => 11
findEarliestAncestor(parentChildPairs, 1) => null or -1
*/

function findEarliestAncestor(parentChildPairs, node) {

    let map = {};

    function setUpMap(array) {
        if (map[array[1]] !== undefined) {
            map[array[1]].push(array[0]);
        }
        else {
            map[array[1]] = [array[0]]
        }
    }

    for (let array of parentChildPairs) {
        setUpMap(array);
    }

    let result = -1;
    let maxStep = Number.MIN_SAFE_INTEGER;

    function highestparent(node, step) {
        let next = map[node];
        if (next === undefined && step > maxStep && step !== 0) {
            result = node;
            maxStep = step;
            return;
        }
        if (next !== undefined && next.length > 0) {
            for (let num of next) {
                highestparent(num, step + 1);
            }
        }
    }
    highestparent(node, 0);
    console.log(result);
    return result;
};

findEarliestAncestor([[1, 3], [2, 3], [3, 6], [5, 6], [5, 7], [4, 5], [4, 8], [8, 10], [11, 2]], 10)