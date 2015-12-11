import _ from "lodash";
import queryString from "query-string";

import Config from "config";

const BASE_URL = "https://www.reddit.com";

export function getAccessToken () {
  const url = "https://www.reddit.com/api/v1/access_token";
}

export function getOauthUrl () {
  const params = {
    client_id: Config.APP_ID,
    response_type: "code",
    state: _.makeId(),
    redirect_uri: Config.REDIRECT_URI,
    duration: "permanent",
    scope: "read",
  };

  return `${BASE_URL}/api/v1/authorize?${queryString.stringify(params)}`;
}

export default {
  getAccessToken,
  getOauthUrl,
};
