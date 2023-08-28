const path = require('path')

module.exports = {
  entry: ['regenerator-runtime/runtime.js', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  devServer: {
    watchFiles: ['../src/index.js'],
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    devMiddleware: {
      publicPath: "https://localhost:9000/scripts"
    }
  },
  devtool: 'source-map'
}