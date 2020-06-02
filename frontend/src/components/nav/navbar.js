import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <span className="nav-resources-menu">
          <Link to={`/releases`}>Releases</Link>
          <Link to={`/personnel`}>Personnel</Link>
        </span>
        <span className="nav-session-menu">
          {this.props.loggedIn ? (
            <>
              <Link className="nav-button" to={`/profile`}>
                <FontAwesomeIcon icon="user" />
                <span>Profile</span>
              </Link>
              <button className="nav-button" onClick={this.logoutUser}>
                <FontAwesomeIcon icon="sign-out-alt" />
                <span>Log Out</span>
              </button>
            </>
          ) : (
            <>
              <Link className="nav-button" to={`/register`}>
                <FontAwesomeIcon icon="user-plus" />
                <span>Register</span>
              </Link>
              <Link className="nav-button" to={`/login`}>
                <FontAwesomeIcon icon="sign-in-alt" />
                <span>Log In</span>
              </Link>
            </>
          )}
        </span>
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
