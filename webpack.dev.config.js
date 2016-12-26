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
        test: /masonry-layout/,
        loader: 'imports?define=>false&this=>window'
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    root: [path.join(__dirname, './src')],
    alias: {
      css: path.resolve(__dirname, 'src/css'),
      pres: path.resolve(__dirname, 'src/js/components/presentational'),
      func: path.resolve(__dirname, 'src/js/components/functional'),
      js: path.resolve(__dirname, 'src/js'),
      actions: path.resolve(__dirname, 'src/js/actions'),
      reducers: path.resolve(__dirname, 'src/js/reducers')
    }
  }
}

module.exports = config
