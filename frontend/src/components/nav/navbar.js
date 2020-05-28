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
      <div className="nav-menu">
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
      <header className="site-header">
        <h1 className="site-header-title">
          <Link to={"/"}>dancey</Link>
        </h1>
        {this.getLinks()}
      </header>
    );
  }
}

export default NavBar;
