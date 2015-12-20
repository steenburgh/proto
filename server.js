/* eslint-disable no-var, prefer-template */

var express = require("express");

var compression = require("compression");
var proxy = require("proxy-middleware");
var serveStatic = require("serve-static");
var url = require("url");

var NODE_ENV = process.env.NODE_ENV || "development";

var __DEV__ = NODE_ENV === "development";
var DEV_PORT = process.env.DEV_PORT || 8080;
var HOST = process.env.HOST || "localhost";
var PORT = process.env.PORT || 8000;

var config = require("./config/server." + NODE_ENV);

var apiUrl;
var app;
var devUrl;
var server;
var template;

app = express();

// Sometimes calls to express get cached by the browser,
// and apparently disabling etag fixes that?
app.disable("etag");
app.use(compression());

// Optional proxy for a separate API
if (config.API_HOST && config.API_PORT) {
  apiUrl = (config.API_PROTOCOL || "http") + "://" +
    config.API_HOST + ":" + config.API_PORT;
  apiUrl = url.parse(apiUrl);

  app.use("/api", proxy(apiUrl));
}

app.use("/static", serveStatic("static"));

// During development,
// load assets via react-hot-loader
if (__DEV__) {
  devUrl = "http://" + HOST + ":" + DEV_PORT + "/build";
  devUrl = url.parse(devUrl);

  app.use("/build", proxy(devUrl));

  app.get("*", (request, response) => {
    response.sendFile("index.html", { root: __dirname });
  });

// TODO: In production,
// determine asset filenames from webpack-generated stats.json
// and inject into the entry point.
} else {
  template = "TODO";
  console.log(template);

  app.use("/build", serveStatic("build"));

  app.get("*", (request, response) => {
    response.sendFile("index.html", { root: __dirname });
  });
}

// For full client-side routing,
// all page requests must be directed to the client entry point,
// which will then handle routing via react-router
server = app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }

  process.on("SIGINT", () => {
    server.close(() => {
      console.info("==> Exiting");
      process.exit(0);
    });
  });

  console.info("==> ✅ Open http://%s:%s in a browser to view the app.", HOST, PORT);
});
