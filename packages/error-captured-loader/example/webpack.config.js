module.exports = {
  mode: 'none',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: '../src/index.js'
      }
    ]
  }
}
