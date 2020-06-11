import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  AuthRoute,
  // ProtectedRoute
} from "../util/route_util";
import MainPage from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import RegisterFormContainer from "./session/register_form_container";
import NavBarContainer from "./nav/navbar_container";
import ReleasesIndexContainer from "./releases/releases_index_container";
import ReleaseShowContainer from "./releases/release_show_container";
import Footer from "./footer/footer";

const App = () => (
  <div>
    <NavBarContainer />
    <main>
      <Switch>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/register" component={RegisterFormContainer} />
        <Route
          exact
          path="/releases/:releaseId"
          component={ReleaseShowContainer}
        />
        <Route exact path="/releases" component={ReleasesIndexContainer} />
        <Route exact path="/" component={MainPage} />
      </Switch>
    </main>
    <Footer />
  </div>
);

export default App;
