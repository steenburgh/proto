var path = require("path");
var webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    "./src/Root",
  ],
  module: {
    loaders: [
      {
        include: path.join(__dirname, "src"),
        loader: "awesome-typescript-loader",
        test: /\.(j|t)s$/,
      },
      {
        loader: "style-loader!css-loader",
        test: /\.css$/,
      }
    ],
    preLoaders: [
      {
        include: path.join(__dirname, "src"),
        loader: "source-map-loader",
        test: /\.js$/,
      },
    ],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "client.js",
    publicPath: "/static/",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  resolve: {
    alias: path.join(__dirname, "node_modules/axios/dist/axios.standalone.js"),
    extensions: ["", ".js", ".ts"],
    modulesDirectories: [
      "src",
      "node_modules",
    ],
  },
};
