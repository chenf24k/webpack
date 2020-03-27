const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(process.cwd(), "dist"),
        filename: 'js/[name].[chunkHash:8].js'
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
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                            publicPath: '/'
                        },
                    },
                ],
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: '模板标题',
            template: 'public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkHash:8].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
        new CopyPlugin([
            {
                from: path.resolve(process.cwd(), 'src/static'),
                to: path.resolve(process.cwd(), 'dist/static')
            },
        ]),
    ],

    devServer: {
        port: 3000,
        open: true,
    }
}