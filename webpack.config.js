const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';

const LoggerPlugin = {
  apply: (compiler) => {
    compiler.hooks.done.tap('LoggerPlugin', (stats) => {
      console.log(stats.toString({ all: false, errors: true, warnings: true, colors: true }));
    });
  },
};

function setupDevtool() {
  if (IS_DEV) {
    return 'eval';
  }

  if (IS_PROD) {
    return false;
  }
}

module.exports = {
  mode: NODE_ENV ? NODE_ENV : 'development',
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
  entry: path.resolve(__dirname, 'src', 'main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
              ],
            },
          },
          'ts-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader",
          'postcss-loader',
        ],
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: './src/css/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['main'],
      filename: 'index.html',
    }),
    LoggerPlugin,],

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },


  devServer: {
    watchFiles: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.css', 'src/**/*.html'],
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    port: 3000,
    liveReload: true,
  },


  devtool: setupDevtool(),
};
