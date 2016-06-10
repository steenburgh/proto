import Promise from "bluebird";

if (window) {
  window.Promise = Promise;
}

import React from "react";
import ReactDOM from "react-dom";

import { renderRoutes } from "Routes";

function Root () {
  return renderRoutes();
}

ReactDOM.render(<Root />, document.getElementById("root"));
