const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    compress: false,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
});
