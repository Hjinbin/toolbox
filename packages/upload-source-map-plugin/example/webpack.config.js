const path = require('path')
const UploadSourceMapPlugin = require('../src/index')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  devtool: 'cheap-source-map',
  plugins: [
    new UploadSourceMapPlugin({
      url: 'http://localhost:5001/upload',
      outputPath: path.join(__dirname, 'dist')
    })
  ]
}
