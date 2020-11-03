import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const HeroSection = props => (
  <section className="hero-section">
    <h1>dancey</h1>
    {props.loggedIn ? (
      props.user && (
        <div className="user-info">
          Welcome back, {props.user.username}
          {/* <h2></h2> */}
        </div>
      )
    ) : (
      <ul className="session-menu">
        <li>
          <button
            className="big-button register"
            onClick={props.openSessionForm("register")}
          >
            <FontAwesomeIcon icon="user-plus" />
            <span>Register</span>
          </button>
        </li>
        <li>
          <button
            className="big-button login"
            onClick={props.openSessionForm("login")}
          >
            <FontAwesomeIcon icon="sign-in-alt" />
            <span>Log In</span>
          </button>
        </li>
      </ul>
    )}
  </section>
);

export default HeroSection;
