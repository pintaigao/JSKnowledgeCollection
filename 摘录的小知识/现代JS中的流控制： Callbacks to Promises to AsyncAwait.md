## 现代JS中的流控制：: Callbacks to Promises to Async/Await 

JavaScript经常声称是*asynchronous*。那是什么意思？它如何影响发展？近年来这种方法有何变化？

请思考以下代码：

```javascript
result1 = doSomething1();
result2 = doSomething2(result1);
```

大多数语言都处理每一行*synchronously*。第一行运行并返回结果。第二行在第一行完成后运行*无论需要多长时间*。

## 单线程处理

JavaScript在单个处理线程上运行。在浏览器选项卡中执行时，其他所有内容都会停止，因为在并行线程上不会发生对页面DOM的更改;将一个线程重定向到另一个URL而另一个线程尝试追加子节点是危险的。

这对用户来说是显而易见。例如，JavaScript检测到按钮单击，运行计算并更新DOM。完成后，浏览器可以自由处理队列中的下一个项目。

*（旁注：其他语言如PHP也使用单个线程，但可以由多线程服务器（如Apache）管理。同时对同一个PHP运行时页面的两个请求可以启动两个运行隔离的实例的线程。）*

## 使用回调进行异步

单线程引发了一个问题。当JavaScript调用“慢”进程（例如浏览器中的Ajax请求或服务器上的数据库操作）时会发生什么？这个操作可能需要几秒钟 - 甚至几分钟。浏览器在等待响应时会被锁定。在服务器上，Node.js应用程序将无法进一步处理用户请求。

解决方案是异步处理。而不是等待完成，一个进程被告知在结果准备好时调用另一个函数。这称为*callback*，它作为参数传递给任何异步函数。例如：

```javascript
doSomethingAsync(callback1);
console.log('finished');

// call when doSomethingAsync completes
function callback1(error) {
  if (!error) console.log('doSomethingAsync complete');
}
```

doSomethingAsync（）接受一个回调函数作为参数（只传递对该函数的引用，因此几乎没有开销）。doSomethingAsync（）需要多长时间并不重要;我们所知道的是callback1（）将在未来的某个时刻执行。控制台将显示：

```js
finished
doSomethingAsync complete
```

### 回调地狱

通常，回调只能由一个异步函数调用。因此可以使用简洁的匿名内联函数：

```javascript
doSomethingAsync(error => {
  if (!error) console.log('doSomethingAsync complete');
});
```

通过嵌套回调函数，可以串行完成一系列两个或多个异步调用。例如：

```javascript
async1((err, res) => {
  if (!err) async2(res, (err, res) => {
    if (!err) async3(res, (err, res) => {
      console.log('async1, async2, async3 complete.');
    });
  });
});
```

不幸的是，这引入了**回调地狱** - 一个臭名昭着的概念([callbackhell.com/](https://link.juejin.im/?target=http%3A%2F%2Fcallbackhell.com%2F)) ！代码难以阅读，并且在添加错误处理逻辑时会变得更糟。

回调地狱在客户端编码中相对较少。如果您正在进行Ajax调用，更新DOM并等待动画完成，它可以深入两到三个级别，但它通常仍然可以管理。

操作系统或服务器进程的情况不同。Node.js API调用可以接收文件上载，更新多个数据库表，写入日志，并在发送响应之前进行进一步的API调用。

## Promises

[ES2015（ES6）推出了Promises](https://link.juejin.im/?target=https%3A%2F%2Fwww.sitepoint.com%2Foverview-javascript-promises%2F)。回调仍然可以使用，但Promises提供了更清晰的语法*chains*异步命令，因此它们可以串行运行（[更多相关内容](https://link.juejin.im/?target=https%3A%2F%2Fwww.sitepoint.com%2Fflow-control-callbacks-promises-async-await%2F%23asynchronouschaining)）。

要启用基于Promise的执行，必须更改基于异步回调的函数，以便它们立即返回Promise对象。该*promises*对象在将来的某个时刻运行两个函数之一（作为参数传递）：

- **resolve** ：处理成功完成时运行的回调函数
- **reject** ：发生故障时运行的可选回调函数。

在下面的示例中，数据库API提供了一个接受回调函数的connect（）方法。外部asyncDBconnect（）函数立即返回一个新的Promise，并在建立连接或失败后运行resolve（）或reject（）：

```javascript
const db = require('database');

// connect to database
function asyncDBconnect(param) {

  return new Promise((resolve, reject) => {

    db.connect(param, (err, connection) => {
      if (err) reject(err);
      else resolve(connection);
    });

  });

}
```

Node.js 8.0+提供了[util.promisify（）实用程序](https://link.juejin.im/?target=https%3A%2F%2Fnodejs.org%2Fapi%2Futil.html%23util_util_promisify_original)，将基于回调的函数转换为基于Promise的替代方法。有几个条件：

1. 必须将回调作为最后一个参数传递给异步函数
2. 回调函数必须指向一个错误，后跟一个值参数。

例子:

```javascript
// Node.js: promisify fs.readFile
const
  util = require('util'),
  fs = require('fs'),
  readFileAsync = util.promisify(fs.readFile);

readFileAsync('file.txt');
```

各种客户端库也提供promisify选项，但您可以自己创建几个：

```javascript
// promisify a callback function passed as the last parameter
// the callback function must accept (err, data) parameters
function promisify(fn) {
  return function() {
      return new Promise(
        (resolve, reject) => fn(
          ...Array.from(arguments),
        (err, data) => err ? reject(err) : resolve(data)
      )
    );
  }
}

// example
function wait(time, callback) {
  setTimeout(() => { callback(null, 'done'); }, time);
}

const asyncWait = promisify(wait);

ayscWait(1000);
```

### 异步链

任何返回Promise的东西都可以启动.then（）方法中定义的一系列异步函数调用。每个都传递了上一个解决方案的结果：

```javascript
asyncDBconnect('http://localhost:1234')
  .then(asyncGetSession)      // passed result of asyncDBconnect
  .then(asyncGetUser)         // passed result of asyncGetSession
  .then(asyncLogAccess)       // passed result of asyncGetUser
  .then(result => {           // non-asynchronous function
    console.log('complete');  //   (passed result of asyncLogAccess)
    return result;            //   (result passed to next .then())
  })
  .catch(err => {             // called on any reject
    console.log('error', err);
  });
```

同步函数也可以在.then（）块中执行。返回的值将传递给下一个.then（）（如果有）。

.catch（）方法定义了在触发任何先前拒绝时调用的函数。此时，不会再运行.then（）方法。您可以在整个链中使用多个.catch（）方法来捕获不同的错误。

ES2018引入了一个.finally（）方法，无论结果如何都运行任何最终逻辑 - 例如，清理，关闭数据库连接等。目前仅支持Chrome和Firefox，但技术委员会39已发布了 [.finally() polyfill.](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Ftc39%2Fproposal-promise-finally%2Fblob%2Ffd934c0b42d59bf8d9446e737ba14d50a9067216%2Fpolyfill.js)

```javascript
function doSomething() {
  doSomething1()
  .then(doSomething2)
  .then(doSomething3)
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    // tidy-up here!
  });
}
```

### 使用Promise.all（）进行多个异步调用

Promise .then（）方法一个接一个地运行异步函数。如果顺序无关紧要 - 例如，初始化不相关的组件 - 同时启动所有异步函数并在最后（最慢）函数运行解析时结束更快。

这可以通过Promise.all（）来实现。它接受一组函数并返回另一个Promise。例如：

```javascript
Promise.all([ async1, async2, async3 ])
  .then(values => {           // array of resolved values
    console.log(values);      // (in same order as function array)
    return values;
  })
  .catch(err => {             // called on any reject
    console.log('error', err);
  });
```

如果任何一个异步函数调用拒绝，则Promise.all（）立即终止。

### 使用Promise.race的多个异步调用（）

Promise.race（）与Promise.all（）类似，只是它会在*first* Promise解析或拒绝后立即解析或拒绝。只有最快的基于Promise的异步函数才能完成：

```javascript
Promise.race([ async1, async2, async3 ])
  .then(value => {            // single value
    console.log(value);
    return value;
  })
  .catch(err => {             // called on any reject
    console.log('error', err);
  });
```

### 但是有什么别的问题吗？

Promises 减少了回调地狱但引入了别的问题。

教程经常没有提到_整个Promise链是异步的。使用一系列promise的任何函数都应返回自己的Promise或在最终的.then（）,. catch（）或.finally（）方法中运行回调函数。

学习基础知识至关重要。

更多的关于Promises的资源：

- [MDN Promise文档](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FPromise)
- [JavaScript Promises: 简介](https://link.juejin.im/?target=https%3A%2F%2Fdevelopers.google.com%2Fweb%2Ffundamentals%2Fprimers%2Fpromises)
- [JavaScript Promises …相关细节](https://link.juejin.im/?target=http%3A%2F%2Fwww.mattgreer.org%2Farticles%2Fpromises-in-wicked-detail%2F)
- [Promises异步编程](https://link.juejin.im/?target=http%3A%2F%2Fexploringjs.com%2Fes6%2Fch_promises.html)

## Async/Await

Promises 可能令人生畏，因此[ES2017](https://link.juejin.im/?target=https%3A%2F%2Fwww.sitepoint.com%2FLINK-to-ES2017-article)引入了async and await。 虽然它可能只是语法糖，它使Promise更完善，你可以完全避免.then（）链。 考虑下面的基于Promise的示例：

```javascript
function connect() {

  return new Promise((resolve, reject) => {

    asyncDBconnect('http://localhost:1234')
      .then(asyncGetSession)
      .then(asyncGetUser)
      .then(asyncLogAccess)
      .then(result => resolve(result))
      .catch(err => reject(err))

  });
}

// run connect (self-executing function)
(() => {
  connect();
    .then(result => console.log(result))
    .catch(err => console.log(err))
})();
```

用这个重写一下async/await:

1. 外部函数必须以async语句开头
2. 对异步的基于Promise的函数的调用必须在await之前，以确保在下一个命令执行之前完成处理。

```javascript
async function connect() {

  try {
    const
      connection = await asyncDBconnect('http://localhost:1234'),
      session = await asyncGetSession(connection),
      user = await asyncGetUser(session),
      log = await asyncLogAccess(user);

    return log;
  }
  catch (e) {
    console.log('error', err);
    return null;
  }

}

// run connect (self-executing async function)
(async () => { await connect(); })();
```

await有效地使每个调用看起来好像是同步的，而不是阻止JavaScript的单个处理线程。 此外，异步函数总是返回一个Promise，因此它们可以被其他异步函数调用。

async/await 代码可能不会更短，但有相当大的好处:

1. 语法更清晰。括号更少，错误更少。
2. 调试更容易。可以在任何await语句上设置断点。
3. 错误处理更好。try / catch块可以与同步代码一样使用。
4. 支持很好。它在所有浏览器（IE和Opera Mini除外）和Node 7.6+中都得到了支持。

但是并非所有都是完美的......

### 切勿滥用async/await

async / await仍然依赖于Promises，它最终依赖于回调。你需要了解Promises是如何工作的，并且没有Promise.all（）和Promise.race（）的直接等价物。并且不要忘记Promise.all（），它比使用一系列不相关的await命令更有效。

### 同步循环中的异步等待

在某些时候，您将尝试调用异步函数中的同步循环。例如：

```javascript
async function process(array) {
  for (let i of array) {
    await doSomething(i);
  }
}
```

它不会起作用。这也不会：

```
async function process(array) {
  array.forEach(async i => {
    await doSomething(i);
  });
}
```

循环本身保持同步，并且总是在它们的内部异步操作之前完成。

ES2018引入了异步迭代器，它与常规迭代器一样，但next（）方法返回Promise。因此，await关键字可以与for循环一起用于串行运行异步操作。例如：

```javascript
async function process(array) {
  for await (let i of array) {
    doSomething(i);
  }
}
```

但是，在实现异步迭代器之前，最好将数组项映射到异步函数并使用Promise.all（）运行它们。例如：

```javascript
const
  todo = ['a', 'b', 'c'],
  alltodo = todo.map(async (v, i) => {
    console.log('iteration', i);
    await processSomething(v);
});

await Promise.all(alltodo);
```

这具有并行运行任务的好处，但是不可能将一次迭代的结果传递给另一次迭代，并且映射大型数组可能在性能消耗上是很昂贵。

### try/catch 有哪些问题了？

如果省略任何await失败的try / catch，async函数将以静默方式退出。如果您有一组很长的异步await命令，则可能需要多个try / catch块。

一种替代方案是高阶函数，它捕获错误，因此try / catch块变得不必要(thanks to [@wesbos](https://link.juejin.im/?target=https%3A%2F%2Ftwitter.com%2Fwesbos%2Fstatus%2F911309291545559041) for the suggestion):

```javascript
async function connect() {

  const
    connection = await asyncDBconnect('http://localhost:1234'),
    session = await asyncGetSession(connection),
    user = await asyncGetUser(session),
    log = await asyncLogAccess(user);

  return true;
}

// higher-order function to catch errors
function catchErrors(fn) {
  return function (...args) {
    return fn(...args).catch(err => {
      console.log('ERROR', err);
    });
  }
}

(async () => {
  await catchErrors(connect)();
})();
```

但是，在应用程序必须以与其他错误不同的方式对某些错误做出反应的情况下，此选项可能不实用。

尽管有一些陷阱，async / await是JavaScript的一个优雅补充。