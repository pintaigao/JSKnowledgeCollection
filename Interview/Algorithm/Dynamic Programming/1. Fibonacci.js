const calculateFibonacci_TopDown = function (n) {
    const memoize = [];

    function fib(n) {
        if (n < 2) return n;
        // if we have already solved this subproblem, simply return the result from the cache
        if (memoize[n]) return memoize[n];
        memoize[n] = fib(n - 1) + fib(n - 2);
        return memoize[n];
    }
    return fib(n);
};

const calculateFibonacci_BottomUp = function (n) {
    const dp = [0, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
};

console.log(`5th Fibonacci is ---> ${calculateFibonacci_BottomUp(5)}`);
console.log(`6th Fibonacci is ---> ${calculateFibonacci_BottomUp(6)}`);
console.log(`7th Fibonacci is ---> ${calculateFibonacci_BottomUp(7)}`);