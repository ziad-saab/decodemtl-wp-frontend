var serverConfiguration = require('universal-webpack').server_configuration;
var settings = require('./universal-webpack-settings');
var configuration = require('./webpack.config');
configuration = require('lodash').cloneDeep(configuration);
module.exports = serverConfiguration(configuration, settings);
