const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
    module: {
        rules: [
            {
                test: /\.js$/,
                loaders: [
                    'babel-loader',
                ],
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve("url-loader"),
                options: {
                    limit: 10000,
                    name: "/static/media/[name].[hash:8].[ext]",
                },
            },
            {
                test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
                loader: require.resolve("file-loader"),
                options: {
                    name: "/static/media/[name].[hash:8].[ext]",
                },
            }
        ],
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'})
    ],
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: 'single',
    },
};

module.exports = config;