import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  getLinks() {
    return (
      <div>
        <Link to={`/releases`}>Releases</Link>
        <Link to={`/personnel`}>Personnel</Link>
        {this.props.loggedIn ? (
          <>
            <Link to={`/profile`}>Profile</Link>
            <button onClick={this.logoutUser}>Log Out</button>
          </>
        ) : (
          <>
            <Link to={`/register`}>Register</Link>
            <Link to={`/login`}>Log In</Link>
          </>
        )}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>
          <Link to={"/"}>dancey</Link>
        </h1>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;
