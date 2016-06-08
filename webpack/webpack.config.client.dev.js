var webpack = require('webpack');
var baseConfig = require('./webpack.config.client');
var configuration = require('lodash').cloneDeep(baseConfig);

configuration.devtool = 'inline-eval-cheap-source-map'

configuration.output.publicPath = 'http://localhost:4201/assets/';

configuration.plugins = configuration.plugins.concat(
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('development'),
			BABEL_ENV: JSON.stringify('development/client')
		},
    __PROD__: false,
    __DEV__: true
	}),
	new webpack.HotModuleReplacementPlugin()
);

configuration.entry.main = [
	'webpack-hot-middleware/client?path=http://localhost:4201/__webpack_hmr&timeout=20000',
	configuration.entry.main
];

var javascriptLoader = configuration.module.loaders.filter(
  function(loader) {
	  return loader.test.toString() === configuration.regularExpressions.javascript.toString();
  }
)[0];
javascriptLoader.loaders.unshift('react-hot');

module.exports = configuration;
