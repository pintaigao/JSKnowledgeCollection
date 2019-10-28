
/* 1, Emitter 的日常，用Emitter打印秒 */
const emiter = new require("events");
const myEmitter = new emiter();
myEmitter.once('newListener', (event, listener) => {
    if (event === 'event') {
        // Insert a new listener in front
        myEmitter.on('event', () => {
            console.log('B');
        });
    }
});

myEmitter.on('event', (count) => {
    console.log(count);
});


class caller {
    constructor() {
        this.count = 0;
    }
    callback() {
        myEmitter.emit('event', this.count);
        this.count += 1;
    }
}

// let callInstance = new caller();
// console.log(emiter.listenerCount(myEmitter, 'event'))
// setInterval(function () {
//     callInstance.callback()
// }, 1000);


/* 2. Delay a function inside a function call line, 方程运行过程中的延迟，一定要用到Promise*/
function sleep(ms) {
    return new Promise(resolve => setTimeout(function () {
        return resolve();
    }, ms));
}

async function demo() {
    console.log('Taking a break...');
    let result = await sleep(2000);
    console.log('Two seconds later, showing sleep in a loop...');
    // Sleep in loop
    for (let i = 0; i < 5; i++) {
        if (i === 3)
            await sleep(2000);
        console.log(i);
    }
}

// demo();


/* Promise all 的日常用法 */
let promise1 = new Promise((resolve, reject) => {
    return resolve("Wait for the promise1");
});

let promise2 = new Promise((resolve, reject) => {
    return resolve("Wait for the promise2");
});

let promise3 = new Promise((resolve, reject) => {
    return resolve("Wait for the promise3");
});

// Promise.all([promise1, promise2, promise3]).then(function(values) {
//     console.log(values);
// });

/* 4. 原型继承链prototype*/

/* 5. Implement a Promise */

/* 6. This 的用法 */

/* 7. for of 和 for in 的区别 */
let array7 = [3, 2, 5, 2, 3, 1, 8, 5];
/* for (let index in array7) {
    console.log(index);
}

for (let element of array7) {
    console.log(element);
} */

let obj = { "1key": 11, "2key": 22, "3key": 33 }

/* for (let key in obj) {
    console.log(key);
}

for (let [key, value] of Object.entries(obj)) {
    console.log(key, value);
}

for (let index in Object.entries(obj)) {
    console.log(index);
} */

/* 8. Decentralize */
let objDe = { 'a': "a1", "b": "b1" }
let { a, b } = objDe;
// console.log(a, b);

/* 9. Hook Simulation */
// const hook = (function () {
//     let val;
//     return {
//         render(Component) {
//             const Comp = Component();
//             Comp.render();
//             return Comp;
//         },
//         useState(init) {
//             val = val || init;
//             function setState(newVal) {
//                 val = newVal;
//             }
//             return [val, setState];
//         }
//     }
// })();

function useState() {

}