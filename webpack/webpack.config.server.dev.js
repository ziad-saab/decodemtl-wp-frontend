var webpack = require('webpack');
var baseConfig = require('./webpack.config.server');
var configuration = require('lodash').cloneDeep(baseConfig);

configuration.plugins = configuration.plugins.concat(
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('development'),
			BABEL_ENV: JSON.stringify('development/server')
		},
    __PROD__: false,
    __DEV__: true
	})
);

module.exports = configuration;
