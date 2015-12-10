import "babel-polyfill";
import "bluebird";
import "isomorphic-fetch";

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

ReactDOM.render(<Root/>, document.getElementById("root"));
