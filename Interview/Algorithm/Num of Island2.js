function solution(map) {
    let direction = [[1, 0], [-1, 0], [0, 1], [0, -1], [-1, -1], [1, 1], [-1, 1], [1, -1]]
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


let map = [[1, 0, 0, 1, 0], [1, 0, 1, 0, 0], [0, 0, 1, 0, 1], [1, 0, 1, 0, 1]]
solution(map);



