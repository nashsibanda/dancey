import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";

export default class HeroSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionForm: "login",
    };
    this.logoutUser = this.logoutUser.bind(this);
    // this.openSessionForm = this.openSessionForm.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // openSessionForm(sessionForm) {
  //   return e => {
  //     this.setState({ sessionForm }, this.props.toggleSessionFormModal);
  //   };
  // }

  render() {
    return (
      <section className="hero-section">
        <h1>dancey</h1>
        {this.props.loggedIn ? (
          this.props.user && (
            <div className="user-info">
              Welcome back, {this.props.user.username}
              <h2></h2>
            </div>
          )
        ) : (
          <ul className="session-menu">
            <li>
              <button
                className="big-button register"
                onClick={this.props.openSessionForm("register")}
              >
                <FontAwesomeIcon icon="user-plus" />
                <span>Register</span>
              </button>
            </li>
            <li>
              <button
                className="big-button login"
                onClick={this.props.openSessionForm("login")}
              >
                <FontAwesomeIcon icon="sign-in-alt" />
                <span>Log In</span>
              </button>
            </li>
          </ul>
        )}
      </section>
    );
  }
}

{
  /* <span className="nav-session-menu">
  {this.props.loggedIn ? (
    <>
      <Link className="big-button" to={`/profile`}>
        <FontAwesomeIcon icon="user" />
        <span>Profile</span>
      </Link>
      <button className="big-button" onClick={this.logoutUser}>
        <FontAwesomeIcon icon="sign-out-alt" />
        <span>Log Out</span>
      </button>
    </>
  ) : (
    <>
      <button className="big-button" onClick={this.openSessionForm("register")}>
        <FontAwesomeIcon icon="user-plus" />
        <span>Register</span>
      </button>
      <button className="big-button" onClick={this.openSessionForm("login")}>
        <FontAwesomeIcon icon="sign-in-alt" />
        <span>Log In</span>
      </button>
    </>
  )}
</span>; */
}
