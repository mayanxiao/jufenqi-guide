var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var devConfig = require('./webpack.dev.config.js')

var host = 'localhost'
var port = '8080'
new WebpackDevServer(webpack(devConfig), {
  publicPath: devConfig.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(port, host, function (err, result) {
  if (err) {
    console.log(err)
  }
  console.log('Listening at http://localhost:' + port)
})
