var webpack = require('webpack');
var baseConfig = require('./webpack.config.server');
var configuration = require('lodash').cloneDeep(baseConfig);

configuration.plugins = configuration.plugins.concat(
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('production'),
			BABEL_ENV: JSON.stringify('production/server')
		},
    __PROD__: true,
    __DEV__: false
	})
);

module.exports = configuration;
