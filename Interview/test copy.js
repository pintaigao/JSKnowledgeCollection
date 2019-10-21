function solution(S) {
    var max_sum = 0;
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
    if (positive) {
        return max_sum;
    }
    return -1;
}


console.log(solution([1000,1000,-1000,1000]));


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

// solution3(011100)

function solution4(A) {
    var n = A.length;
    var L = new Array(n + 1);
    L[0] = -1;
    var i;
    for (i = 0; i < n; i++) {
        L[i + 1] = A[i];
    }
    var count = 0;
    var pos = Math.floor((n + 1) / 2);
    candidate = L[pos];
    for (i = 1; i <= n; i++) {
        if (L[i] == candidate)
            count = count + 1;
    }
    if (count > pos)
        return candidate;
    return (-1);
}


console.log(solution4([2147483647,2147483647]));

