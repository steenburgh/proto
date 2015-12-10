const express = require("express");
const proxy = require("proxy-middleware");
const serveStatic = require("serve-static");
const url = require("url");

const app = express();
const devPort = process.env.DEV_PORT || 8080;
const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 8000;

app.use("/build", proxy(url.parse(`http://${hostname}:${devPort}/build`)));
app.use(serveStatic("static"));

app.get("*", (request, response) => {
  response.sendFile("index.html", { root: __dirname });
});

app.listen(port);
