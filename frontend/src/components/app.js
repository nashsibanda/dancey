import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import {
  AuthRoute,
  // ProtectedRoute
} from "../util/route_util";
import HomePage from "./homepage/homepage";
import LoginFormContainer from "./session/login_form_container";
import RegisterFormContainer from "./session/register_form_container";
import MainReleaseCatalogueContainer from "./releases/main_release_catalogue_container";
import ReleaseShowContainer from "./releases/release_show_container";
import Footer from "./footer/footer";
import PersonnelShowContainer from "./personnel/personnel_show_container";
import ScrollIntoView from "./util/scroll_into_view";
import { connect } from "react-redux";
import { logout, toggleSessionFormModal } from "../actions/session_actions";
import NavBar from "./nav/navbar";
import SessionFormModalContainer from "./session/session_form_modal_container";

const App = props => {
  const [sessionForm, setSessionForm] = useState("login");

  const logoutUser = e => {
    e.preventDefault();
    props.logout();
  };

  const openSessionForm = sessionForm => {
    return e => {
      setSessionForm(sessionForm);
      props.toggleSessionFormModal();
    };
  };

  return (
    <div>
      <ScrollIntoView>
        <NavBar
          loggedIn={props.loggedIn}
          user={props.user}
          openSessionForm={openSessionForm}
          logoutUser={logoutUser}
        />
        <SessionFormModalContainer form={sessionForm} />
        <main>
          <Switch>
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute
              exact
              path="/register"
              component={RegisterFormContainer}
            />
            <Route
              exact
              path="/releases/:releaseId"
              component={ReleaseShowContainer}
            />
            <Route
              exact
              path="/personnel/:personnelId"
              component={PersonnelShowContainer}
            />
            <Route
              exact
              path="/releases"
              component={MainReleaseCatalogueContainer}
            />
            <Route
              exact
              path="/"
              render={props => (
                <HomePage
                  openSessionForm={openSessionForm}
                  logoutUser={logoutUser}
                  loggedIn={props.loggedIn}
                  user={props.user}
                />
              )}
            />
          </Switch>
        </main>
        <Footer />
      </ScrollIntoView>
    </div>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  user: state.session.user,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  toggleSessionFormModal: () => dispatch(toggleSessionFormModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
