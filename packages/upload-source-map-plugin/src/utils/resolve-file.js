const path = require('path')
const fs = require('fs')

const sourceMapExpList = [/\.map$/]

// 找到sourcemap，返回绝对路径
module.exports = resolveFile = (outputPath) => {
  const res = []
  read(outputPath)
  return res

  function read (p) {
    const dirList = fs.readdirSync(p)
    dirList.forEach(dir => {
      const wholePath = path.join(p, dir)
      const stat = fs.statSync(wholePath)
      // 递归读取
      if (stat.isDirectory()) {
        read(wholePath)
      }
      if (stat.isFile() && sourceMapExpList.some(e => e.test(dir))) {
        res.push(wholePath)
      }
    })
  }
}

