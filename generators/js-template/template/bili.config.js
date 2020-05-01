// bili 文档：https://bili.egoist.sh/#/
// bili api文档：https://bili.egoist.sh/api/index.html
module.exports = {
  input: './src/index.js',

  output: {
    dir: 'dist',
    minify: true,
    extractCSS: false,
    sourceMap: false,
    target: 'browser',
    moduleName: '<%= camelName %>',
    format: ['cjs-min', 'esm-min', 'umd-min']
  },
  bundleNodeModules: true
}
