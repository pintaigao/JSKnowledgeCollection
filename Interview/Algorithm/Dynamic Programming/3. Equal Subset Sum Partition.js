/* Brute Froced */
let canPartition = function (num) {
    let sum = 0;
    for (let i = 0; i < num.length; i++) sum += num[i];
    // if 'sum' is a an odd number, we can't have two subsets with equal sum
    if (sum % 2 !== 0) return false;
    return canPartitionRecursive(num, sum / 2, 0);
};

function canPartitionRecursive(num, sum, currentIndex) {
    // base check
    if (sum === 0) return true;
    if (num.length === 0 || currentIndex >= num.length) return false;
    // recursive call after choosing the number at the currentIndex
    // if the number at currentIndex exceeds the sum, we shouldn't process this
    if (num[currentIndex] <= sum) {
        if (canPartitionRecursive(num, sum - num[currentIndex], currentIndex + 1)) return true;
    }
    // recursive call after excluding the number at the currentIndex
    return canPartitionRecursive(num, sum, currentIndex + 1);
}

console.log(`Can partitioning be done: ---> ${canPartition([1, 2, 3, 4])}`);
console.log(`Can partitioning be done: ---> ${canPartition([1, 1, 3, 4, 7])}`);
console.log(`Can partitioning be done: ---> ${canPartition([2, 3, 4, 6])}`);