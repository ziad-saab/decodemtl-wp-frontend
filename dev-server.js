var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpack = require('webpack');
var express = require('express');

var app = express();

var webpackConfig = require('./webpack/webpack.config.client.dev');
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: 'http://localhost:4201/assets',
  hot: true,
  stats: {
      colors: true
  },
  noInfo: true
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

app.listen(4201);
