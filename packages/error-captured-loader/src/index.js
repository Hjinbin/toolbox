const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const generate = require('@babel/generator').default

module.exports = source => {
  const ast = parser.parse(source)
  traverse(ast, {
    // 找到 await 表达式
    AwaitExpression (path) {
      // 判断是否声明一个数组，进行解构赋值
      // const [err, res] = await fn()
      const parent = path.parent
      if (t.isVariableDeclarator(parent) && t.isArrayPattern(parent.id)) {
        // 找到 await 执行的异步函数，存在 argument 属性
        const awaitExp = parent.init
        const awaitArgs = awaitExp.argument
        // 包裹一个函数调用表达式在外面 `resolvePromise(fn())`
        const resolvePromiseExp = t.callExpression(
          t.identifier('resolvePromise'),
          [awaitArgs]
        )
        awaitExp.argument = resolvePromiseExp
      }
    }
  })
  const output = generate(ast, source)
  return output.code
}
