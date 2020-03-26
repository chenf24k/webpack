const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(process.cwd(), "dist"),
        filename: 'static/js/[name].[chunkHash:8].js'
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader'],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: '模板标题',
            template: 'public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[chunkHash:8].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
    ],

    devServer: {
        port: 3000,
        open: true,
    }
}