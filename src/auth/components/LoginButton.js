import PureRenderMixin from "react-addons-pure-render-mixin";
import React from "react";

import { getOauthUrl } from "util/RedditApi";

const LoginButton = React.createClass({

  mixins: [PureRenderMixin],

  render () {
    const oauthUrl = getOauthUrl();

    return (
      <button>
        <a href={oauthUrl}>
          Log in!
        </a>
      </button>
    );
  },
});

export default LoginButton;
