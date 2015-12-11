import PureRenderMixin from "react-addons-pure-render-mixin";
import queryString from "query-string";
import React from "react";

import { getAccessToken } from "util/RedditApi";

const AuthPage = React.createClass({

  propTypes: {
    history: React.PropTypes.object,
  },

  mixins: [PureRenderMixin],

  componentWillMount () {
    if (document && document.location && document.location.search) {
      const params = queryString.parse(document.location.search);

      if (params.error) {
        // TODO: Handle auth errors

      } else if (params.code) {
        // TODO: Retrieve access token

      } else {
        // Unexpected behavior, redirect to index as fallback
        this.props.history.replaceState(null, "/");
      }

    } else {
      // We shouldn't have hit this page, redirect to index as fallback
      this.props.history.replaceState(null, "/");
    }
  },

  render () {
    return null;
  },
});

export default AuthPage;
