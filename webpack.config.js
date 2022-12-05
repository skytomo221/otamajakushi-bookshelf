const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const outputPath = path.join(__dirname, 'dist');
const common = {
  cache: true,
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(ico|png|svg|eot|woff?2?)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};
const mainConfig = {
  ...common,
  target: 'electron-main',
  entry: './src/main/index.ts',
  output: {
    path: outputPath,
    filename: 'main.js',
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: 'assets',
        },
      ],
    }),
  ],
};
const preloadConfig = {
  ...common,
  target: 'electron-preload',
  entry: './src/renderer/preload.ts',
  output: {
    path: outputPath,
    filename: 'preload.js',
  },
};
const rendererConfig = {
  ...common,
  target: 'electron-renderer',
  entry: './src/renderer/index.tsx',
  output: {
    path: outputPath,
    filename: 'renderer.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: './css/style.css',
    }),
  ],
};

module.exports = [mainConfig, preloadConfig, rendererConfig];
