# error-captured-loader

> webpack loader: 为 await 表达式自动注入异常处理函数，并以 `[err, res]` 的格式返回，适用于 async/await 的同步写法

## async/await 异常处理

举个例子，异步函数如下

```javascript
function asyncFunc (flag) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (flag) {
        resolve('resolve!!')
      } else {
        reject(new Error('reject..'))
      }
    }, 100)
  })
}
```

```javascript
// 没有异常处理，异步函数抛出错误时程序会直接报错
async function test () {
  await asyncFunc(true)
  await asyncFunc() // 报错
}
```

### 使用 try catch

```javascript
async function test () {
  await asyncFunc(true)
  try {
    await asyncFunc()
  } catch (err) {
    console.log(err)
  }
}
```

### 使用同步写法

```javascript
// 包裹一个 Promise 用于处理异常
function resolvePromise (promise) {
  return new Promise((resolve) => {
    return promise.then(res => {
      resolve([null, res])
    }).catch(error => {
      resolve([error, null])
    })
  })
}

async function test () {
  const [err, res] = await resolvePromise(asyncFunc())
  console.log(err, res) // Error: reject..  null

  const [err1, res1] = await resolvePromise(asyncFunc(true))
  console.log(err1, res1) // null resolve!!
}
```

### 使用 loader 自动注入

直接编写，此 loader 会自动包裹一层上面的异常处理函数

```javascript
// 源码
async function test () {
  const [err, res] = await asyncFunc()
  console.log(err, res) // Error: reject..  null

  const [err1, res1] = await asyncFunc(true)
  console.log(err1, res1) // null resolve!!
}

// 编译后
async function test () {
  const [err, res] = await resolvePromise(asyncFunc())
  console.log(err, res) // Error: reject..  null

  const [err1, res1] = await resolvePromise(asyncFunc(true))
  console.log(err1, res1) // null resolve!!
}
```

### TODO

以下表达式暂时不会被转换，暂时只识别**await 表达式**，是一个**声明变量**，且变量是一个**数组(用于解构)**

```javascript
// 表达式
await asyncFunc()
// 没有解构
const res = await asyncFunc()
// 表达式赋值而不是声明变量
let res
([err, res] = await asyncFunc())
// 没有解构，且不是声明变量
(res = await asyncFunc())
```
