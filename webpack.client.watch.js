/* eslint-disable no-var, prefer-template */

const webpack = require("webpack");
const config = require("./webpack.client.js");

const hostname = process.env.HOSTNAME || "localhost";

config.cache = true;
config.debug = true;
config.devtool = "cheap-module-source-map";

config.entry.unshift(
  "webpack-dev-server/client?http://" + hostname + ":8080",
  "webpack/hot/only-dev-server"
);

config.output.publicPath = "http://" + hostname + ":8080/build/";
config.output.hotUpdateMainFilename = "update/[hash]/update.json";
config.output.hotUpdateChunkFilename = "update/[hash]/[id].update.js";

config.plugins = [
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === "development")),
  }),
  new webpack.HotModuleReplacementPlugin(),
];

config.module.postLoaders = [
  {
    exclude: /node_modules/,
    loaders: ["react-hot"],
    test: /\.js$/,
  },
];

config.devServer = {
  publicPath: "http://" + hostname + ":8080/build/",
  contentBase: "./static",
  hot: true,
  inline: true,
  lazy: false,
  quiet: true,
  noInfo: false,
  headers: { "Access-Control-Allow-Origin": "*" },
  stats: { colors: true },
  host: hostname,
};

module.exports = config;
