const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [new Dotenv()],
  devtool: 'source-maps',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        }
      }
    ]
  }
};
