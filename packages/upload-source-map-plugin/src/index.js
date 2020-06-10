const resolveFile = require('./utils/resolve-file')

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
    sourcemapList.forEach(p => {
      uploadFile({url, outputPath})
    })
  }
}

module.exports = UploadSourceMapPlugin
