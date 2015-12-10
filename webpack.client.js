/* eslint-disable no-var, prefer-template */

const webpack = require("webpack");
const path = require("path");

const BUILD_PATH = path.join(__dirname, "build");
const SRC_PATH = path.join(__dirname, "src");

module.exports = {
  cache: false,
  context: __dirname,
  devtool: false,
  entry: [path.join(SRC_PATH, "Root")],
  eslint: {
    configFile: path.join(__dirname, ".eslintrc"),
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loaders: ["babel?cacheDirectory&presets[]=es2015&presets[]=react&presets[]=stage-0"],
        test: /\.js$/,
      },
      {
        loaders: ["json"],
        test: /\.json$/,
      },
    ],
    postLoaders: [],
    preLoaders: [
      {
        include: /src/,
        loaders: ["eslint-loader"],
        test: /\.js$/,
      },
    ],
    noParse: /\.min\.js/,
  },
  node: {
    __dirname: true,
    fs: "empty",
  },
  output: {
    chunkFilename: "[name].[id].js",
    filename: "client.js",
    path: BUILD_PATH,
    publicPath: "build/",
  },
  plugins: [
    new webpack.DefinePlugin({ __CLIENT__: true, __SERVER__: false }),
    new webpack.DefinePlugin({ "process.env": { NODE_ENV: process.env.NODE_ENV } }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  resolve: {
    alias: {
      config: path.join(__dirname, "config", process.env.NODE_ENV || "development"),
      react: path.join(__dirname, "node_modules/react"),
    },
    extensions: ["", ".js", ".json"],
    modulesDirectories: [
      "src",
      "node_modules",
    ],
  },
  target: "web",
};
