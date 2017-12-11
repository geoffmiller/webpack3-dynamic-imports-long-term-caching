const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_DIR = path.resolve(__dirname, './src');
const MODULES_DIR = path.resolve(__dirname, './node_modules');

const package = require('./package.json');

module.exports = {
  devServer: {
    historyApiFallback: true
  },
  entry: {
    app: APP_DIR +'/index.js',
    vendor: Object.keys(package.dependencies)
  },
  output: {
    publicPath: '/',
    chunkFilename: '[name].[chunkhash].js',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [ APP_DIR, MODULES_DIR ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include : APP_DIR,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Caching and Code Splitting',
      template: APP_DIR + '/index.html'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor',
      filename: 'vendor.[chunkhash].js'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:'manifest'
    })
  ]
};
