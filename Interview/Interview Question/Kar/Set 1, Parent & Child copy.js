/* 
Suppose we have some input data describing a graph of relationships between parents and children over multiple generations.
The data is formatted as a list of (parent, child) pairs, where each individual is assigned a unique integer identifier.
For example, in this diagram, 3 is a child of 1 and 2, and 5 is a child of 4:

parentChildPairs = [  (1, 3), (2, 3), (3, 6), (5, 6),(5, 7), (4, 5), (4, 8), (8, 10) ]
Write a function that takes this data as input and returns two collections: one containing all individuals with zero known parents, and one containing all individuals with exactly one known parent.
findNodesWithZeroAndOneParents(parentChildPairs) =>
[ [1, 2, 4],    // Individuals with zero parents
[5, 7, 8, 10] // Individuals with exactly one parent ] */

function findNodesWithZeroAndOneParents(parentChildPairs) {
    let set = new Set();
    let array = [];

    for (let pair of parentChildPairs) {
        if (array[pair[1]] === undefined) {
            array[pair[1]] = [pair[0]];
        } else {
            array[pair[1]].push(pair[0]);
        }
        set.add(pair[1]);
        set.add(pair[0]);
    }

    let parent = [];
    let child = [];

    console.log(array);

    for (let i = 0; i < array.length; i++) {
        if (array[i] === undefined) {
            if (set.has(i)) {
                parent.push(i);
            }
        } else if (array[i].length === 1) {
            child.push(i);
        }
    }

    let result = [parent, child];
    console.log(result);
    return result

}

// findNodesWithZeroAndOneParents([[1, 3], [2, 3], [3, 6], [5, 6], [5, 7], [4, 5], [4, 8], [8, 10]]);
// findNodesWithZeroAndOneParents([[1, 4], [1, 5], [2, 5], [3, 6], [6, 7]]);
/* Time O(N+V) */
/* Time O(NV) */

/*
第二题：
Write a function that takes the graph, as well as two of the individuals in our dataset, as its inputs and returns true if and only if they share at least one ancestor.
Sample input and output: （input和上面一样）
hasCommonAncestor(parentChildPairs, 3, 8) => false
hasCommonAncestor(parentChildPairs, 5, 8) => true
hasCommonAncestor(parentChildPairs, 6, 8) => true
hasCommonAncestor(parentChildPairs, 1, 3) => false
*/

function hasCommonAncestor(parentChildPairs, a, b) {
    let set = new Set();
    let array = [];

    for (let pair of parentChildPairs) {
        if (array[pair[1]] === undefined) {
            array[pair[1]] = [pair[0]];
        } else {
            array[pair[1]].push(pair[0]);
        }
        set.add(pair[1]);
        set.add(pair[0]);
    }

    function getParent(node, set) {
        let parentArray = array[node];
        if (parentArray === undefined || parentArray.length === 0) {
            return;
        }
        for (let parent of parentArray) {
            set.add(parent);
            getParent(parent, set);
        }
    }

    let setA = new Set();
    setA.add(a);
    let setB = new Set();
    setB.add(b);
    getParent(a, setA);
    getParent(b, setB);

    for (let i of setB) {
        if (setA.has(i)) {
            return true;
        }
    }

    return false;
    // compare setA and setB, find common one

}

console.log(hasCommonAncestor([[1, 3], [2, 3], [3, 6], [5, 6], [5, 7], [4, 5], [4, 8], [8, 10]], 3, 6));
console.log(hasCommonAncestor([[1, 4], [1, 5], [2, 5], [3, 6], [6, 7]], 3, 6));


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
