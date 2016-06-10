import Axios from "axios";
import React from "react";

const HomePage = React.createClass({

  _handleClick () {
    Axios.post("/api/auth/login")
      .then((response) => {
        console.log(response);
      });
  },

  render () {
    return <button onClick={this._handleClick}>Hello, Sea World!</button>;
  },
});

export default HomePage;
