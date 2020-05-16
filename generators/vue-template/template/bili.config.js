module.exports = {
  input: './src/index.vue',

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
