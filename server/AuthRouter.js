/* eslint-disable new-cap, no-var, object-shorthand, prefer-template */

var express = require("express");
var queryString = require("query-string");
var request = require("request");

function _makeId (len) {
  len = len || 8;

  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var text = "";
  var i;

  for (i = 0; i < len; i++) {
    text = text + possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function _getAccessToken (config, code) {
  var url = `${config.BASE_URL}/api/v1/access_token`;

  return new Promise((resolve, reject) => {
    try {
      request({
        auth: {
          username: config.APP_ID,
          password: config.APP_SECRET,
        },
        form: {
          code: code,
          grant_type: "authorization_code",
          redirect_uri: config.REDIRECT_URI,
        },
        method: "POST",
        url: url,

      }, (e, r, body) => {
        resolve(JSON.parse(body));
      });

    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

function _getOauthUrl (config) {
  var params = {
    client_id: config.APP_ID,
    response_type: "code",
    state: _makeId(),
    redirect_uri: config.REDIRECT_URI,
    duration: "permanent",
    scope: "identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread",
  };

  return `${config.BASE_URL}/api/v1/authorize?${queryString.stringify(params)}`;
}

function _revokeToken (config, token) {
  var url = `${config.BASE_URL}/api/v1/revoke_token`;

  return new Promise((resolve, reject) => {
    try {
      request({
        auth: {
          username: config.APP_ID,
          password: config.APP_SECRET,
        },
        form: {
          token: token,
        },
        method: "POST",
        url: url,

      }, (e, r, body) => {
        resolve(JSON.parse(body));
      });

    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

function createAuthRouter (config) {
  var router = express.Router();

  router.get("/connect", (req, res) => {
    var code;
    var error;

    if (req.get("Referrer") !== "https://www.reddit.com/") {
      res.status(403);
      return;
    }

    error = req.query.error;

    if (error) {
      res.redirect(`/?error=${error}`);
      return;
    }

    code = req.query.code;

    _getAccessToken(config, code)
      .then((data) => {
        if (data.error) {
          res.redirect(`/?error=${data.error}`);
          return;
        }

        res.cookie("access_token", data.access_token, {
          httpOnly: true,
          maxAge: (data.expires_in || 0) * 1000,
        });

        res.cookie("refresh_token", data.refresh_token, {
          httpOnly: true,
          maxAge: (data.expires_in || 0) * 1000,
        });

        res.cookie("is_logged_in", true, {
          maxAge: (data.expires_in || 0) * 1000,
        });

        res.redirect("/?success=true");
      })
      .catch(() => {
        res.redirect("/?error=500");
      });
  });

  router.post("/login", (req, res) => {
    var oauthUrl = _getOauthUrl(config);

    res.redirect(oauthUrl);
  });

  router.post("/logout", (req, res) => {
    // TODO: Actually tell Reddit to revoke the tokens

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.clearCookie("is_logged_in");

    res.redirect("/?success=true");
  });

  return router;
}

module.exports = createAuthRouter;
