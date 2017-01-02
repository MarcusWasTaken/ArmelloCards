'use strict';

const path = require('path')
const webpack = require('webpack')

const config = {
  cache: true,
  devtool: 'eval-source-map',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './.tmp'),
    publicPath: '/.tmp'
  },
  entry: {
    app: ['./src/js/index']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /masonry-layout/,
        loader: 'imports?define=>false&this=>window'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss', '.json'],
    root: [path.join(__dirname, './src')],
    alias: {
      css: path.resolve(__dirname, 'src/css'),
      js: path.resolve(__dirname, 'src/js'),
      src: path.resolve(__dirname, 'src')
    }
  }
}

module.exports = config
