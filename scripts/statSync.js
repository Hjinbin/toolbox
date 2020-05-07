// github page 使用 docs 目录下的内容
// 将 packages 中的文档同步到 docs

const fs = require('fs')
const path = require('path')
const { copySync } = require('fs-extra')

const joinPkg = (...args) => path.join(__dirname, '../packages', ...args)
const joinDocs = (...args) => path.join(__dirname, '../docs', ...args)

const pkgDirs = fs.readdirSync(joinPkg())

// 同步项目 README.md
fs.copyFileSync(path.join(__dirname, '../README.md'), joinDocs('README.md'))

pkgDirs.forEach(dirName => {
  const dir = joinPkg(dirName)
  const stats = fs.statSync(dir)
  if (stats.isFile()) return

  // 同步 packages 下 README.md
  const readmePath = joinPkg(dirName, 'README.md')
  const isReadmeExist = fs.existsSync(readmePath)
  if (isReadmeExist) {
    const docPkgReadmePath = path.join(__dirname, '../docs/packages', dirName, 'README.md')
    // 使用 copySync，目标目录不存在会自动创建
    copySync(readmePath, docPkgReadmePath)
  }

  // 同步 packages 下 docs
  const pkgDocsPath = joinPkg(dirName, 'docs')
  if (fs.existsSync(pkgDocsPath)) {
    copySync(pkgDocsPath, joinDocs('api-docs', dirName))
  }

  // 同步 packages 下 coverage
  const pkgCoveragePath = joinPkg(dirName, 'coverage')
  if (fs.existsSync(pkgCoveragePath)) {
    copySync(pkgCoveragePath, joinDocs('coverage', dirName))
  }
})
