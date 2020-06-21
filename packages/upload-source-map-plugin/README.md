# cai-upload-source-map-plugin

> 打包后自动上传 `source-map` 的 webpack plugin

## 快速开始

### 安装

```shell
npm install cai-upload-source-map-plugin
```

### 使用

`webpack.config.js`

```javascript
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
```

### Options

#### url

`required`

上传 source map 的接口

#### outputPath

`required`

打包后输出的目录
