/*
 * @lc app=leetcode id=17 lang=javascript
 *
 * [17] Letter Combinations of a Phone Number
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */

let map = {
    2: "abc",
    3: "def",
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: "tuv",
    9: "wxyz"
}

let result = [];

function helper(combination, nextDigit) {
    if (!nextDigit.length) {
        result.push(combination);
        return;
    }
    let digit = nextDigit.substring(0, 1);
    let letters = map[digit];
    for (let i = 0; i < letters.length; i++) {
        let letter = map[digit].substring(i, i + 1);
        helper(combination + letter, nextDigit.substring(1))
    }

}

function letterCombinations(digits) {
    if (digits.length !== 0) {
        helper("", digits);
    }

    console.log(result);
    return result;
};

// letterCombinations("");


/* BFS Solution */
function letterCombinations2(digits) {
    let ans = [];
    if (!digits.length) return ans;
    let map = ["0", "1", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    let result = [];
    ans = [...map[digits[0] - '0'].split("")];
    while (ans.length) {
        let remove = ans.shift();
        if (remove.length === digits.length) {
            result.push(remove);
            continue;
        }
        // Idea 通过测量digits上index对应的数字，所以第一个利索当然是0
        let map2 = map[digits[remove.length] - '0'];
        for (let c of map2.split("")) {
            ans.push(remove + c + "");
        }
    }
    console.log(result);
    return ans;
}

/* 
[ 'a', 'b', 'c' ]
[ 'b', 'c', 'ad', 'ae', 'af' ]
[ 'c', 'ad', 'ae', 'af', 'bd', 'be', 'bf' ]
[ 'ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf' ]
[ 'ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf' ]
*/

letterCombinations2("23");
// @lc code=end

