var server = require('universal-webpack').server;
var settings = require('./webpack/universal-webpack-settings');
var configuration = require('./webpack/webpack.config');
server(configuration, settings);
