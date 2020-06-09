const UploadSourceMapPlugin = require('../src/index')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  plugins: [
    new UploadSourceMapPlugin({
      url: '1',
      outputPath: '12'
    })
  ]
}
