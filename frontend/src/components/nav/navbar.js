import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GlobalSearchContainer from "../search/global_search_container";

const NavBar = props => {
  const goToResource = (field, selected) => {
    const { resourceType, value } = selected;
    props.history.push(`/${resourceType}/${value}`);
    return;
  };

  const getLinks = () => {
    return (
      <nav className="nav-menu">
        <span className="nav-resources-menu">
          <Link to={`/releases`}>Releases</Link>
          {/* <Link to={`/personnel`}>Personnel</Link> */}
          <GlobalSearchContainer
            recordType={"all"}
            multiSelect={false}
            placeholderText={"Search..."}
            optionLinks
            noCreate
            formUpdate={goToResource}
          />
        </span>
        <span className="nav-session-menu">
          {props.loggedIn ? (
            <>
              <Link className="nav-button" to={`/profile`}>
                <FontAwesomeIcon icon="user" />
                <span>Profile</span>
              </Link>
              <button className="nav-button" onClick={props.logoutUser}>
                <FontAwesomeIcon icon="sign-out-alt" />
                <span>Log Out</span>
              </button>
            </>
          ) : (
            <>
              <button
                className="nav-button"
                onClick={props.openSessionForm("register")}
              >
                <FontAwesomeIcon icon="user-plus" />
                <span>Register</span>
              </button>
              <button
                className="nav-button"
                onClick={props.openSessionForm("login")}
              >
                <FontAwesomeIcon icon="sign-in-alt" />
                <span>Log In</span>
              </button>
            </>
          )}
        </span>
      </nav>
    );
  };

  return (
    <>
      <header className="site-header">
        <h1 className="site-header-title">
          <Link to={"/"}>dancey</Link>
        </h1>
        {getLinks()}
      </header>
    </>
  );
};

export default withRouter(NavBar);
