const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv');
const { DefinePlugin } = require('webpack');

module.exports = {
  output: {
    publicPath: '/',
    chunkFilename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(png|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: './index.html',
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed || ''),
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
