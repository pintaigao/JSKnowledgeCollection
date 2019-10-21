function solution(S) {
    var max_sum = -1;
    var current_sum = 0;
    var positive = false;
    var n = S.length;
    for (var i = 0; i < n; ++i) {
        var item = S[i];
        if (item < 0) {
            if (max_sum < current_sum) {
                max_sum = current_sum;
                current_sum = 0;
            }
        } else {
            positive = true;
            current_sum += item;
        }
    }
    if (current_sum > max_sum) {
        max_sum = current_sum;
    }

    if (positive) return max_sum;
    return -1;
}


console.log(solution([-1000, -2, 1, 1, -1, 10, 0]));


function solution2(ranks) {
    let set = new Set(ranks);
    let count = 0;
    for (let rank of ranks) {
        if (set.has(rank + 1)) {
            count += 1
        }
    }

    return count;
}

// console.log(solution2([4, 4, 3, 3, 1, 0]));



function solution3(S) {
    // write your code in JavaScript (Node.js 8.9.4)
    // let num = parseInt(S,2);
    // let count = 0
    // while(num > 0){
    //     count ++;
    //     num = num%2 === 0? num/2: num-1;
    // }
    // return count;
    // if (S & 1) {
    //     console.log("奇数");
    // } else {
    //     console.log("偶数");
    // }
    S = S >> 1
    console.log(parseInt(S, 2));
}

solution3(011100)