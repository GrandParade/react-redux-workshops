'use strict';

require('babel-core/register', {
    presets: ['es2015'],
    plugins: ['react-transform'],
    extra: {}
});

global.BROWSER = false;

require('./require.polyfill');

process.env.SPEED = process.env.SPEED || 1;

const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const config = require('./webpack.config');

const app = express();
const server = http.Server(app);

require('./websocket-server')(server);

const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const compiler = webpack(config);

const HTML_FILE = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

function render() {
    let p = path.join(__dirname, 'src/index.node');

    Object.keys(require.cache).forEach(key => {
        if (key.substr(-3) === '.js') {
            delete require.cache[key];
        }
    });

    return HTML_FILE.replace('{content}', require(p));
}

app.use(devMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(hotMiddleware(compiler));
app.get('*', (req, res) => {
    res.send(render());
});

// Start listening

let httpPort = process.env.HTTP_PORT || 5555;
let httpHost = process.env.HTTP_INTERFACE || 'localhost';

server.listen(httpPort, httpHost, function (err) {
    if (err) {
        return console.error(err);
    }

    console.info('Listening at http://%s:%s', httpHost, httpPort);
    process.on('uncaughtException', err => console.error(err));
});
