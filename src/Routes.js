/* eslint-disable react/jsx-sort-props */

import { IndexRoute, Router, Route } from "react-router";
import React from "react";

import App from "App";
import AuthPage from "auth/components/AuthPage";
import HomePage from "home/components/HomePage";

export function renderRoutes (appHistory) {
  return (
    <Router history={appHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage} />

        <Route path="auth" component={AuthPage} />
      </Route>
    </Router>
  );
}

export default {
  renderRoutes,
};
