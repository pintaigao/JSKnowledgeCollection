function sum() {
    var res = 0,
        i = 0,
        len = arguments.length;
    for (; i < len; i++) {
        res += arguments[i];
    }
    console.log('Sum called', res);
    return res;
}

function mul() {
    var res = 0,
        i = 0,
        len = arguments.length;
    for (; i < len; i++) {
        res += arguments[i];
    }
    console.log('Mul called', res);
    return res;
}

function safeArgs(func) {
    if (arguments.length !== func.length) {
        throw 'Wrong numbe of arguments';
    }
    return func.apply(window, arguments);
}

function memorize(f) {
    if (!f.cache) f.cache = {};
    return function () {
        var cacheId = [].slice.call(arguments).join('');
        console.log(this);
        return f.cache[cacheId] ?
            f.cache[cacheId] :
            f.cache[cacheId] = f.apply(window, arguments);
    };
}

var mSum = memorize(sum);
mSum(1, 2)
mSum(1, 2)
mSum(1, 2)
mSum(1, 2)
mSum(1, 2)