const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config');
console.log('Using webpack.main.config.js');
module.exports = merge.smart(baseConfig, {
    target: 'electron-main',
    entry: {
        main: './src/main.ts'
    },
    module: {
        rules: [
            {
                test: /\.ts|\.tsx$/,
                include: [
                    path.resolve(__dirname, 'src', 'main.ts'),
                    path.resolve(__dirname, 'src', 'main-process-helpers')
                ],
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
});
