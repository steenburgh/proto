import { browserHistory, IndexRoute, Route, Router } from "react-router";
import React from "react";

import App from "App";
import HomePage from "home/components/HomePage";
import NotFoundPage from "notfound/components/NotFoundPage";

export function renderRoutes () {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="*" component={NotFoundPage}/>
      </Route>
    </Router>
  );
}

export default {
  renderRoutes,
};
