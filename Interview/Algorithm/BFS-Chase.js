/* Shortest winter days.
 Root to leaf path with maximum distinct nodes.  
 */

function bfs(map, start, target) {
    let result = new Array(map.length).fill(0).map(_ => {
        return new Array(map[0].length).fill(Number.MAX_VALUE);
    });

    result[start[0]][start[1]] = 0;
    let directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    let queue = [start];
    let finalResult;
    while (queue.length) {
        let curr = queue.shift();
        for (let direction of directions) {
            let row = curr[0] + direction[0];
            let column = curr[1] + direction[1];
            if (row < 0 || column < 0 || row >= map.length || column >= map[0].length || ((result[row][column] >= result[curr[0]][curr[1]] + 1) && result[row][column] !== Number.MAX_VALUE) || (row === start[0] && column === start[1])) {
                continue;
            }
            if (result[row][column] > result[curr[0]][curr[1]] + 1 || result[row][column] === Number.MAX_VALUE) {
                result[row][column] = result[curr[0]][curr[1]] + 1;
            }
            if (row === target[0] && column === target[1]) {
                finalResult = result[row][column];
                // return;
            }
            queue.push([row, column]);
        }
        console.log(result);
    }
    console.log(finalResult);
}


let map = [[0, 'start', 0, 0], [0, 0, 0, 0], [0, 0, 0, 'target'], [0, 0, 0, 0]]

console.log(bfs(map, [0, 1], [2, 3]));

