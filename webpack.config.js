/* eslint-disable no-var, object-shorthand, prefer-template */

var webpack = require("webpack");

var path = require("path");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

var __DEV__ = process.env.NODE_ENV === "development";
var BUILD_PATH = path.join(__dirname, "build");
var HOST = process.env.HOST || "localhost";
var SRC_PATH = path.join(__dirname, "src");

var config = {
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
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  resolve: {
    alias: {
      config: path.join(__dirname, "config", "client." + (process.env.NODE_ENV || "development")),
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

// Use webpack-dev-server and react-hot-loader during development
if (__DEV__) {
  config.cache = true;
  config.debug = true;
  config.devtool = "cheap-module-source-map";

  config.entry.unshift(
    "webpack-dev-server/client?http://" + HOST + ":8080",
    "webpack/hot/only-dev-server"
  );

  config.output.publicPath = "http://" + HOST + ":8080/build/";
  config.output.hotUpdateMainFilename = "update/[hash]/update.json";
  config.output.hotUpdateChunkFilename = "update/[hash]/[id].update.js";

  // Splice because StatsWriterPlugin needs to be last
  config.plugins = [
    new webpack.DefinePlugin({ __DEV__: true }),
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
    publicPath: "http://" + HOST + ":8080/build/",
    contentBase: "./static",
    hot: true,
    inline: true,
    lazy: false,
    quiet: true,
    noInfo: false,
    headers: { "Access-Control-Allow-Origin": "*" },
    stats: { colors: true },
    host: HOST,
  };

} else {
  // IMPORTANT: StatsWriterPlugin must be last in the plugins array!
  config.plugins.push(
    new StatsWriterPlugin({ filename: "../stats.json" })
  );
}


module.exports = config;
