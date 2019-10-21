function nbYear(p0, percent, aug, p) {
    let result = 1;
    function helper(p0, percent, aug, p, count) {
        let tempResult = p0 + p0 * (percent / 100) + aug;
        if (tempResult > p) { 
            result = count;
            return;
        } else {
            helper(tempResult, percent, aug, p, count + 1)
        }
    }
    helper(p0, percent, aug, p, 1);
    return result;
}

console.log(nbYear(1500, 5, 100, 5000));
