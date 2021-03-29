const rules = require('./webpack.rules');
const HtmlWebpackPlugin = require('html-webpack-plugin');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
      }),
    ],
  },
};
