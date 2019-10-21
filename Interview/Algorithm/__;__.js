function solution(string) {
    //1. handling the map
    let preStringArray = string.split(";");
    let start = [];
    let target = []
    let map = new Array(preStringArray.length).fill(0).map(_ => new Array());
    for (let i = 0; i < preStringArray.length; i++) {
        let preString = preStringArray[i].split("");
        preString.forEach((element, index) => {
            if (element === "O") {
                start = [i, index];
                element = 0;
            };
            if (element === "T") target = [i, index];
            map[i].push(element);
        });
    }

    let queue = [start];
    let directions = [[1, 0], [-1, 0], [0, -1], [0, 1]];
    while (queue.length) {
        let curr = queue.pop();
        for (let direction of directions) {
            let row = direction[0] + curr[0];
            let colum = direction[1] + curr[1];
            if (row < 0 || colum < 0 || row >= map.length || colum >= map[row].length || map[row][colum] === "X" || map[row][colum] <= map[curr[0]][curr[1]] + 1) {
                continue;
            }

            map[row][colum] = map[curr[0]][curr[1]] + 1;

            queue.push([row, colum]);
        }

        console.log(map);
    }

    console.log(map[target[0]][target[1]]);

}

solution("O___;__X__T;___")

