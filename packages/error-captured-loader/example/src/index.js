// 使用 loader 注入到代码中，暂时写在这里
function resolvePromise (promise) {
  return new Promise((resolve) => {
    return promise.then(res => {
      resolve([null, res])
    }).catch(error => {
      resolve([error, null])
    })
  })
}
// 异步函数
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

async function test () {
  console.log('test1...')
  const [err, res]  = await asyncFunc(true)
  console.log(err, res)
  const data = await asyncFunc(true)
  await asyncFunc(true)
  const [err1, res1] = await asyncFunc()
  console.log(err1, res1)
}

test()
