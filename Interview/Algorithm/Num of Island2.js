function solution(map) {
    let result = [];
    let directions = [[-1, 0], [1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            let count = 0;
            if (map[i][j] === 1) {
                count += 1;
                let queue = [[i, j]];
                map[i][j] = 0;
                while (queue.length) {
                    let current = queue.shift();
                    for (let direction of directions) {
                        let row = current[0] + direction[0];
                        let colum = current[1] + direction[1];
                        if (row < 0 || row >= map.length || colum < 0 || colum >= map[0].length || map[row][colum] === 0) {
                            continue;
                        }
                        if (map[row][colum] === 1) {
                            queue.push([row, colum]);
                            count += 1;
                            map[row][colum] = 0;
                        }
                    }
                }
                result.push(count)
            }
        }
    }
    console.log(result.sort());
    return result.sort();
}


let map = [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 0, 1, 0], [1, 1, 1, 1, 1]]
solution(map);


/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    let result = [];

    function dfs(current, left, right) {
        if (current.length == 2 * n) {
            result.push(current);
            return;
        }
        if (left < n) {
            dfs(current.concat("("), left + 1, right);
        }
        if (left > right) {
            dfs(current.concat(")"), left, right + 1);
        }
    }

    dfs("", 0, 0)
    console.log(result);
    return result;
};

generateParenthesis(3);
