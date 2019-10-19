/* 实现Promise */
const PromisePolyfill = (() => {
    //状态管理 Symbol, 变量名是独一无二的
    const promiseStatusSymbol = Symbol('PromiseStatus');
    const promiseValueSymbol = Symbol('PromiseValue');
    const STATUS = {
        PENDING: 'PENDING',
        FULFILLED: 'FULFILLED',
        REJECTED: 'REJECTED'
    };
    //resolve操作设置值和状态
    function resolve() {
        this[promiseValueSymbol] = arguments[0];
        this[promiseStatusSymbol] = STATUS['FULFILLED'];
    }
    //reject操作设置值和状态
    function reject() {
        this[promiseValueSymbol] = arguments[0];
        this[promiseStatusSymbol] = STATUS['REJECTED'];
    }

    class myPromise {
        constructor(resolver) {
            if (typeof resolver !== 'function') {
                throw new TypeError(`parameter 1 must be a function, but get a ${typeof func}`);
            }
            this[promiseStatusSymbol] = STATUS['PENDING'];//初始状态为pending
            resolver(resolve.bind(this), reject.bind(this));
        }
        then(callback) {
            //开一个定时器监听状态变化，如果有变化则执行callback, setInterval key it alive
            const interval = setInterval(() => {
                if (this[promiseStatusSymbol] === 'FULFILLED' || this[promiseStatusSymbol] === 'REJECTED') {
                    clearInterval(interval);
                    callback(this[promiseValueSymbol], resolve.bind(this), reject.bind(this));
                    this[promiseStatusSymbol] = 'PENDING';//执行完后把状态改回，方便下一个then方法进行定时轮询
                }
            });
            return this;
        }
    }
    // 下面马上执行返回myPromise function
    return myPromise;
})();


let promise = new PromisePolyfill(function (resolve, reject) {
    setTimeout(() => {
        resolve(222);
    }, 1000)
    console.log(111)
}).then(function (res, resolve, reject) {
    console.log(res);
})


/* 我更喜欢上面这个 */
// class MyPromise {
//     constructor(fn) {
//         if (typeof fn !== 'function') {
//             throw new TypeError(`MyPromise fn ${fn} is not a function`)
//         }
//         this.state = 'pending';
//         this.value = void 0;
//         fn(this.resolve.bind(this), this.reject.bind(this))
//     }
//     resolve(value) {
//         if (this.state !== 'pending') return;
//         this.state = 'fulfilled';
//         this.value = value
//     }

//     reject(reason) {
//         if (this.state !== 'pending') return;
//         this.state = 'rejected';
//         this.value = reason
//     }

//     then(fulfilled, rejected) {
//         if (typeof fulfilled !== 'function' && typeof rejected !== 'function') {
//             return this;
//         }
//         if (typeof fulfilled !== 'function' && this.state === 'fulfilled' ||
//             typeof rejected !== 'function' && this.state === 'rejected') {
//             return this;
//         }
//         return new MyPromise((resolve, reject) => {
//             if (fulfilled && typeof fulfilled === 'function' && this.state === 'fulfilled') {
//                 let result = fulfilled(this.value);
//                 // 如果fullfill中又定义并且返回了一个Promise
//                 if (result && typeof result.then === 'function') {
//                     return result.then(resolve, reject)
//                 } else {
//                     resolve(result)
//                 }
//             }
//             if (rejected && typeof rejected === 'function' && this.state === 'rejected') {
//                 let result = rejected(this.value);
//                 if (result && typeof result.then === 'function') {
//                     return result.then(resolve, reject)
//                 } else {
//                     reject(result);
//                 }
//             }
//         })
//     }
//     catch(rejected) {
//         return this.then(null, rejected)
//     }
// }


// new MyPromise((resolve, reject) => {
//     console.log(1);
//     //reject(2)
//     resolve(2);
//     console.log(3);
//     // setTimeout(() => { console.log(4) }, 0)
// }).then(res => {
//     console.log(res);
//     // return new MyPromise((resolve, reject) => {
//     //     resolve(5)
//     // }).then(res => {
//     //     return res
//     // })
// }).then(res => {
//     console.log(res)
// }).catch(e => {
//     console.log('e', e)
// })