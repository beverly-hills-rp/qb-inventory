const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
    devtool: 'eval-source-map',
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        open: false,
    },
});
