const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const { clear } = require('console');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    devtool: 'source-map',
    plugins: [
        new CopyPlugin({
            patterns: [{ from: 'public' }],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: ['babel-loader']
            }
        ]
    }
};