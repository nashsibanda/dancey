import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SessionFormModalContainer from "../session/session_form_modal_container";
import GlobalSearchContainer from "../search/global_search_container";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionForm: "login",
    };
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.openSessionForm = this.openSessionForm.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  openSessionForm(sessionForm) {
    return e => {
      this.setState({ sessionForm }, this.props.toggleSessionFormModal);
    };
  }

  getLinks() {
    return (
      <div className="nav-menu">
        <span className="nav-resources-menu">
          <Link to={`/releases`}>Releases</Link>
          <Link to={`/personnel`}>Personnel</Link>
          <GlobalSearchContainer
            recordType={"all"}
            multiSelect={false}
            placeholderText={"Search..."}
            optionLinks
            noCreate
          />
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
              <button
                className="nav-button"
                onClick={this.openSessionForm("register")}
              >
                <FontAwesomeIcon icon="user-plus" />
                <span>Register</span>
              </button>
              <button
                className="nav-button"
                onClick={this.openSessionForm("login")}
              >
                <FontAwesomeIcon icon="sign-in-alt" />
                <span>Log In</span>
              </button>
            </>
          )}
        </span>
      </div>
    );
  }

  render() {
    return (
      <>
        <header className="site-header">
          <h1 className="site-header-title">
            <Link to={"/"}>dancey</Link>
          </h1>
          {this.getLinks()}
        </header>
        <SessionFormModalContainer form={this.state.sessionForm} />
      </>
    );
  }
}

export default NavBar;
