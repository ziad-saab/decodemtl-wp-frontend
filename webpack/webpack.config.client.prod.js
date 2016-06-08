var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.client')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var configuration = require('lodash').cloneDeep(baseConfig);

configuration.devtool = 'source-map'
configuration.plugins = configuration.plugins.concat(
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('production')
		},
    __DEV__: false,
    __PROD__: true
	}),
	new ExtractTextPlugin('[name]-[contenthash].css', { allChunks: true }),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.OccurenceOrderPlugin(),
	// new webpack.optimize.CommonsChunkPlugin('common', 'common.[hash].js'), // enable if we start chunkin'
	new webpack.optimize.UglifyJsPlugin()
);

// configuration.output.filename = '[name]-[chunkhash].js' // enable if we start chunkin'

var scssLoader = configuration.module.loaders.filter(function(loader) {
	return loader.test.toString() === configuration.regularExpressions.styles.toString()
})[0];

scssLoader.loader = ExtractTextPlugin.extract(scssLoader.loaders.shift(), scssLoader.loaders.join('!'));
delete scssLoader.loaders;

module.exports = configuration;
