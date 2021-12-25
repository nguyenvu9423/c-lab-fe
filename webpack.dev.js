const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    http2: true,
    historyApiFallback: true,
    compress: false,
    https: true,
    port: 3000,
    // proxy: {
    //   '/api': { target: 'https://localhost:8080', secure: false },
    // },
  },
});
