module.exports = {
  input: './src/index.js',

  plugins: {
    vue: true
  },
  output: {
    dir: 'dist',
    minify: true,
    extractCSS: false,
    sourceMap: false,
    target: 'browser',
    format: 'cjs-min'
  },
  bundleNodeModules: true
}
