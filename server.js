/* eslint-disable no-var, object-shorthand, prefer-template */

var NODE_ENV = process.env.NODE_ENV || "development";

var express = require("express");

var compression = require("compression");
var cookieParser = require("cookie-parser");
var fs = require("fs");
var handlebars = require("handlebars");
var morgan = require("morgan");
var proxy = require("proxy-middleware");
var url = require("url");

var createApiRouter = require("./server/ApiRouter");
var config = require("./config/server." + NODE_ENV);

var __DEV__ = NODE_ENV === "development";
var DEV_PORT = process.env.DEV_PORT || 8080;
var HOST = process.env.HOST || "localhost";
var PORT = process.env.PORT || 8000;

var app;
var devUrl;
var indexPage;
var logger;
var server;
var templateFile = fs.readFileSync("./views/index.html", "utf8");
var template = handlebars.compile(templateFile);


app = express();


// Sometimes calls to express get cached by the browser,
// and apparently disabling etag fixes that?
app.disable("etag");
app.use(cookieParser());
app.use(compression());


if (config.ENABLE_LOGGING) {
  if (__DEV__) {
    logger = morgan("combined");

  } else {
    logger = morgan("combined", {
      skip: function (req, res) {
        return res.statusCode < 400;
      },
    });
  }

  app.use(logger);
}


app.use("/static", express.static("static"));

app.use("/api", createApiRouter(config));


// During development,
// load assets via react-hot-loader
if (__DEV__) {
  indexPage = template({ __DEV__: __DEV__ });

  devUrl = "http://" + HOST + ":" + DEV_PORT + "/build";
  devUrl = url.parse(devUrl);

  app.use("/build", proxy(devUrl));

  app.get("*", (request, response) => {
    response.send(indexPage);
  });


// TODO: In production,
// determine asset filenames from webpack-generated stats.json
// and inject into the entry point.
} else {
  indexPage = template({ __DEV__: __DEV__ });

  app.use("/static", express.static("build"));

  app.get("*", (request, response) => {
    response.send(indexPage);
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
