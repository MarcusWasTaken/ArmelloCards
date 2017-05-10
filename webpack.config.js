'use strict';

const path = require('path')
const webpack = require('webpack')
const production = process.env.NODE_ENV === 'production'
const development = !production

let plugins = []

if (production) {
  plugins = plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ], plugins)
}

const config = {
  cache: development ? true : false,
  devtool: development ? 'eval-source-map' : false,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, development ? './.tmp' : './dist'),
    publicPath: development ? '/.tmp' : '/dist'
  },
  plugins,
  entry: {
    app: ['./src/js/index']
  },
  module: {
    loaders: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.scss$/,
        loader: `style-loader!css-loader!sass-loader?outputStyle=${production ? 'compressed' : 'expanded'}`
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
    extensions: ['', '.js', '.css', '.scss', '.json'],
    root: [path.join(__dirname, './src')],
    alias: {
      css: path.resolve(__dirname, 'src/styles'),
      js: path.resolve(__dirname, 'src/js'),
      src: path.resolve(__dirname, 'src'),
      actions: path.resolve(__dirname, 'src/js/actions'),
      components: path.resolve(__dirname, 'src/js/components'),
      containers: path.resolve(__dirname, 'src/js/containers')
    }
  }
}

module.exports = config