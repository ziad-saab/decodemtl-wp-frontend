var clientConfiguration = require('universal-webpack').client_configuration;
var settings = require('./universal-webpack-settings');
var configuration = require('./webpack.config');
configuration = require('lodash').cloneDeep(configuration);
module.exports = clientConfiguration(configuration, settings);
