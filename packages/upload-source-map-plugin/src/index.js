const resolveFile = require('./utils/resolve-file')
const uploadFile = require('./utils/upload-file')

/**
 * @class
 * webpack 构建完成后自动上传 sourcemap
 */
class UploadSourceMapPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    const { url, outputPath } = this.options
    if (url && outputPath) {
      // 监听 compiler hook：done
      // 打包完成执行回调函数
      compiler.hooks.done.tap('uploadSourceMapPlugin', params => this.doneCallback(this.options, params))
    }
  }

  doneCallback ({ url, outputPath }) {
    const sourcemapList = resolveFile(outputPath)
    // TODO: 文件名应该体现出目录结构，如 js/a.js.map，方便后台按目录存储
    sourcemapList.forEach(({ path: filePath, name: fileName }) => {
      uploadFile({ url, filePath, fileName })
    })
  }
}

module.exports = UploadSourceMapPlugin
