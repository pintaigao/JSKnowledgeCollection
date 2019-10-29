/* Brute Forced */
let solveKnapsack = function (profits, weights, capacity) {
    function knapsackRecursive(profits, weights, capacity, currentIndex) {
        // base checks
        if (capacity <= 0 || currentIndex >= profits.length) return 0;

        // recursive call after choosing the element at the currentIndex
        // if the weight of the element at currentIndex exceeds the capacity, we shouldn't process this
        let profit1 = 0;
        if (weights[currentIndex] <= capacity) {
            profit1 =
                profits[currentIndex] +
                knapsackRecursive(profits, weights, capacity - weights[currentIndex], currentIndex + 1);
        }

        // recursive call after excluding the element at the currentIndex
        const profit2 = knapsackRecursive(profits, weights, capacity, currentIndex + 1);

        return Math.max(profit1, profit2);
    }

    return knapsackRecursive(profits, weights, capacity, 0);
};

var profits = [1, 6, 10, 16];
var weights = [1, 2, 3, 5];
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 7)}`);
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`);

/* Top Down With DP */
let solveKnapsack = function (profits, weights, capacity) {
    const dp = [];

    function knapsackRecursive(profits, weights, capacity, currentIndex) {
        // base checks
        if (capacity <= 0 || currentIndex >= profits.length) return 0;

        dp[currentIndex] = dp[currentIndex] || [];
        if (typeof dp[currentIndex][capacity] !== 'undefined') {
            return dp[currentIndex][capacity];
        }

        // recursive call after choosing the element at the currentIndex
        // if the weight of the element at currentIndex exceeds the capacity, we shouldn't process this
        let profit1 = 0;
        if (weights[currentIndex] <= capacity) {
            profit1 =
                profits[currentIndex] +
                knapsackRecursive(profits, weights, capacity - weights[currentIndex], currentIndex + 1);
        }

        // recursive call after excluding the element at the currentIndex
        const profit2 = knapsackRecursive(profits, weights, capacity, currentIndex + 1);

        dp[currentIndex][capacity] = Math.max(profit1, profit2);
        return dp[currentIndex][capacity];
    }
    let result = knapsackRecursive(profits, weights, capacity, 0);
    console.log(dp);
    return result;
};

var profits = [1, 6, 10, 16];
var weights = [1, 2, 3, 5];
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 7)}`);
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`);

/* 正常人的DP */
let solveKnapsack = function (profits, weights, capacity) {
    const n = profits.length;
    if (capacity <= 0 || n == 0 || weights.length != n) return 0;

    const dp = Array(profits.length)
        .fill(0)
        .map(() => Array(capacity + 1).fill(0));

    // populate the capacity=0 columns; with '0' capacity we have '0' profit
    for (let i = 0; i < n; i++) dp[i][0] = 0;

    // if we have only one weight, we will take it if it is not more than the capacity
    for (let c = 0; c <= capacity; c++) {
        if (weights[0] <= c) dp[0][c] = profits[0];
    }

    // process all sub-arrays for all the capacities
    for (let i = 1; i < n; i++) {
        for (let c = 1; c <= capacity; c++) {
            let profit1 = 0,
                profit2 = 0;
            // include the item, if it is not more than the capacity (c - weights[i] ==> 上一个情况的 remaining capacity 的最优解)
            if (weights[i] <= c) profit1 = profits[i] + dp[i - 1][c - weights[i]];
            // exclude the item
            profit2 = dp[i - 1][c];
            // take maximum
            dp[i][c] = Math.max(profit1, profit2);
        }
    }

    // maximum profit will be at the bottom-right corner.
    return dp[n - 1][capacity];
};

var profits = [1, 6, 10, 16];
var weights = [1, 2, 3, 5];
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 7)}`);
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`);

/* Find the pair that forms the max profit */
