const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.ts',
    target: 'web',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './index.html',
        }),
    ],
};
