const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  mode: 'development',
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      process: 'process/browser',
      '../../theme.config$': path.join(__dirname, '/semantic-ui/theme.config'),
      '../semantic-ui/site': path.join(__dirname, '/semantic-ui/site'),
    },
    fallback: {
      util: require.resolve('util/'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
      },
      {
        test: /\.styl/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        exclude: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                math: 'always',
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    compress: false,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080',
    },
    watchContentBase: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'LogN', template: './src/index.html' }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
  },
};

module.exports = config;
