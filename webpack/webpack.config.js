var path = require('path');
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

var rootDir = path.resolve(__dirname, '..');

var regularExpressions = {
	javascript : /\.jsx?$/,
	styles: /\.scss$/
};

var configuration = {
	context: rootDir,
	entry: {
		main: './src/js/app.js'
	},
	output: {
		path: path.resolve(rootDir, 'build/assets'),
		publicPath: '/assets/',
		filename: '[name].[hash].js',
		chunkFilename: '[name].[hash].js'
	},
	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: regularExpressions.javascript,
				exclude: /node_modules/,
				loaders: ['babel']
			},
			{
				test: regularExpressions.styles,
				loaders: [
					'style-loader',
					'css-loader?importLoaders=2&sourceMap',
          'postcss-loader',
					'sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
				]
			},
			{
				test: /\.(jpg|png)$/,
				loaders: ['url-loader?limit=10000']
			}
		]
	},
  postcss: function() {
    return [precss, autoprefixer];
  },
	progress: true,
  resolve: {
		extensions: ['', '.json', '.js', '.jsx']
	},
	plugins: [],
  regularExpressions: regularExpressions
};

module.exports = configuration;
