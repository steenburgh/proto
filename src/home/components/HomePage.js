import React from "react";

import LoginButton from "auth/components/LoginButton";

const HomePage = React.createClass({
  render () {
    return (
      <div>
        <LoginButton />
      </div>
    );
  },
});

export default HomePage;
