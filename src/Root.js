import "babel-polyfill";
import Promise from "bluebird"; // eslint-disable-line no-shadow

if (window) {
  window.Promise = Promise;
}

import createBrowserHistory from "history/lib/createBrowserHistory";
import React from "react";
import ReactDOM from "react-dom";

import { renderRoutes } from "Routes";

const appHistory = createBrowserHistory();

const Root = React.createClass({
  render () {
    return renderRoutes(appHistory);
  },
});

ReactDOM.render(<Root />, document.getElementById("root"));
