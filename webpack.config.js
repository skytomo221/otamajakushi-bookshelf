const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const outputPath = path.join(__dirname, 'dist');
const mainConfig = {
  target: 'electron-main',
  entry: './src/main/index.ts',
  cache: true,
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: outputPath,
    filename: 'main.js',
  },
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
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};
const preloadConfig = {
  target: 'electron-preload',
  entry: './src/renderer/preload.ts',
  cache: true,
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: outputPath,
    filename: 'preload.js',
  },
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
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};
const rendererConfig = {
  target: 'electron-renderer',
  entry: './src/renderer/index.tsx',
  cache: true,
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: outputPath,
    filename: 'renderer.js',
  },
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
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
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
