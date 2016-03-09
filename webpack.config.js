const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client',
        path.join(__dirname, 'src/index')
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'app.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: [ path.resolve(__dirname, 'node_modules') ],
                loaders: [ 'babel-loader', 'eslint' ]
            },
            {
                test: /\.(scss|css)$/,
                loaders: [ 'style', 'css', 'autoprefixer', 'sass' ]
            },
            { test: /\.json$/, loader: 'json' },
            { test: /\.(png|jpg|gif)$/, loader: 'file-loader' }
        ],
        noParse: []
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                BABEL_ENV: JSON.stringify('development/client'),
                SPEED: process.env.SPEED || 1
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
