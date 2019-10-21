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
var letterCombinations = function (digits) {
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

    function helper(combination, next_digits) {
        if (!next_digits.length) {
            result.push(combination);
        } else {
            let digit = next_digits.substring(0, 1);
            let letters = map[digit];
            for (let i = 0; i < letters.length; i++) {
                let letter = map[digit].substring(i, i + 1);
                helper(combination + letter, next_digits.substring(1))
            }
        }
    }

    function letterCombination(digits) {
        if (digits.length !== 0) {
            helper("", digits);
        }
        return result;
    }
};
// @lc code=end

