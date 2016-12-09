'use strict';
let path = require('path');
let defaultSettings = require('./defaults');
var autoprefixer = require('autoprefixer');
var px2rem = require('postcss-px2rem');

let additionalPaths = [];

module.exports = {
  additionalPaths: additionalPaths,
  port: defaultSettings.port,
  host: defaultSettings.host,
  output: {
    filename: 'app.js',
    path: path.join(__dirname, '../dist/assets'),
    publicPath: defaultSettings.publicPath
  },
  devServer: {
    inline: true,
    quiet: true,
    color: true,
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      actions: `${defaultSettings.srcPath}/actions/`,
      components: `${defaultSettings.srcPath}/components/`
    }
  },
  module: {},
  postcss: function () {
    return [
      require('precss'),
      require('autoprefixer'),
      px2rem({remUnit: 75})
    ];
  }
};
