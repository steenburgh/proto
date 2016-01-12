/* eslint-disable new-cap, no-var, object-shorthand, prefer-template */

var express = require("express");
var request = require("request");

var createAuthRouter = require("./AuthRouter");

function _makeRequest (config, req, url, method, query, data) {
  return new Promise((resolve, reject) => {
    var token = req.cookies.access_token;

    if (!token) {
      reject({ status: 403 });
    }

    try {
      request({
        auth: {
          bearer: token,
        },
        headers: {
          "User-Agent": config.USER_AGENT,
        },
        method: method,
        url: `${config.OAUTH_URL}${url}`,

      }, (e, r, body) => {
        console.log("ERROR GUY", e, r, body);
        resolve(JSON.parse(body));
      });

    } catch (e) {
      console.error(e);
      reject({ status: 500, error: e });
    }
  });
}

function createApiRouter (config) {
  var router = express.Router();
  var authRouter = createAuthRouter(config);

  router.use("/auth", authRouter);

  router.get("/me", (req, res) => {
    _makeRequest(config, req, "/api/v1/me", "GET")
      .then((data) => {
        res.json(data);
      })
      .catch((errorData) => {
        res.status(errorData.status);
      });
  });

  return router;
}

module.exports = createApiRouter;
