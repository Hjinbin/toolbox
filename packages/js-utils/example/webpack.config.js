const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    port: '4000',
    quiet: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'example'
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        // TODO: 动态设置实际端口，信息前面的 I 改为成功的标志
        messages: [`Your application is running here: http://local.oa.com:4000`]
      },
      clearConsole: true
    })
  ]
}
