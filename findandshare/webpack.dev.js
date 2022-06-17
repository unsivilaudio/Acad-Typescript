const path = require('path');
const DotEnv = require('dotenv-webpack');
const merge = require('webpack-merge-config');
const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    devServer: {
        watchFiles: path.join(__dirname, 'index.html'),
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.s(a|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css'],
    },
    plugins: [new DotEnv()],
};

module.exports = merge(commonConfig, devConfig);
