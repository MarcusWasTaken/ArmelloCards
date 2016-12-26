'use strict';

const path = require('path')
const webpack = require('webpack')

const config = {
  cache: false,
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist'),
    publicPath: '/dist'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ],
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
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    root: [path.join(__dirname, './src')],
    alias: {
      components: path.resolve(__dirname, 'src/js/components/'),
      pages: path.resolve(__dirname, 'src/js/pages/')
    }
  }
}

module.exports = config
