function largestUniquePathUtil(node, set) {
    function helper(node) {
        if (!node) {
            return set.size();
        }
        set.add(node.val)
        result = Math.max(largestUniquePathUtil(node.left, set), largestUniquePathUtil(node.right, set));
        set.remove(node.val);
        return result;
    }
    let result = 0;

    result = helper(node, new Set());
    return result;
}

function max_difference(arr) {
    let max_diff = arr[1] - arr[0];
    let min_element = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] - min_element > max_diff) max_diff = arr[i] - min_element;
        if (arr[i] < min_element) min_element = arr[i];
    }
    return max_diff;
}

function numberArrange(nums) {
    let numString = nums + "";
    let numArray = numString.split("")
    let visit = []
    let result = new Set();
    function helper(num) {
        if (num.length === numArray.length) {
            result.add(num);
        }
        for (let i = 0; i < numArray.length; i++) {
            if (!visit[i]) {
                visit[i] = true;
                helper(num + numArray[i]);
                visit[i] = false;
            }
        }
    }
    helper("");
    return result;
}
console.log(numberArrange(1123));