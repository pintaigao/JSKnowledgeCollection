/* Intuit 网上coding competition的一道题给一个矩阵，矩阵里的每个元素是1，但是其中分布着一些长方形区域，
这些长方形区域中的元素为0. 要求输出每个长方形的位置（用长方形的左上角元素坐标和右下角元素坐标表示）。
example：
input:
[
[1,1,1,1,1,1],
[0,0,1,0,1,1],
[0,0,1,0,1,0],
[1,1,1,0,1,0],
[1,0,0,1,1,1]
]
output:. 
[
[1,0,2,1],
[1,3,3,3],
[2,5,3,5],
[4,1,4,2]
]
 */

function solution1(matrix) {
    let result = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] == 0) {
                let right = i, down = j;
                while (right < matrix.length) {
                    if (matrix[right][j] === 0) {
                        right++;
                    } else {
                        break
                    }
                }
                while (down < matrix[0].length) {
                    if (matrix[i][down] === 0) {
                        down++;
                    } else {
                        break;
                    }
                }
                return [i, j, --right, --down];
            }
        }
    }
    return result;
}

function solution2(matrix) {
    let result = [];
    function dfs(tempResult, i, j) {
        if (i < 0 || i >= matrix.length || j < 0 || j >= matrix[0].length || matrix[i][j] !== 0) {
            return;
        }
        tempResult[0] = Math.min(tempResult[0], i)
        tempResult[1] = Math.min(tempResult[1], j)
        tempResult[2] = Math.max(tempResult[2], i)
        tempResult[3] = Math.max(tempResult[3], j)
        matrix[i][j] = -1;
        dfs(tempResult, i + 1, j)
        dfs(tempResult, i - 1, j)
        dfs(tempResult, i, j + 1)
        dfs(tempResult, i, j - 1)

    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] == 0) {
                let tempResult = [i, j, i, j];
                dfs(tempResult, i, j);
                result.push(tempResult.slice());
            }
        }
    }
    return result;
}

/* 第三问 */
/* given a matrix containing 1 and 0. There are multiple shapes constructed with 0s
 (not just rectangles). Find all of indexes of 0s, group by the shape. */

let matrix1 = [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1]];
let matrix2 = [[1, 1, 1, 1, 1, 1], [0, 0, 1, 0, 1, 1], [0, 0, 1, 0, 1, 0], [1, 1, 1, 0, 1, 0], [1, 0, 0, 1, 1, 1]];

console.log(solution1(matrix1));
solution2(matrix2);

function solution3(matrix) {
    let result = [];
    let connected_component = [];
    function dfs(i, j) {
        if (i < 0 || i >= matrix.length || j < 0 || j >= matrix[0].length || matrix[i][j] !== 0) {
            return;
        }
        matrix[i][j] = -1;
        result.push([i, j]);
        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j + 1)
        dfs(i, j - 1)

    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] == 0) {
                dfs(i, j);
                connected_component.push(result.slice());
                result = [];
            }
        }
    }

    console.log(connected_component);
    return connected_component;
}


let matrix3 = [[1, 1, 1, 1, 1, 1], [0, 0, 1, 0, 1, 1], [0, 0, 1, 0, 1, 0], [1, 1, 1, 0, 1, 0], [1, 0, 0, 1, 1, 1]];
solution3(matrix3);