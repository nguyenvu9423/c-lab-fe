const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    http2: true,
    historyApiFallback: true,
    https: true,
    port: 3000,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: '"https://localhost:8080/api"',
      },
    }),
  ],
  devtool: 'eval-cheap-source-map',
});
