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
import MainReleaseCatalogueContainer from "./releases/main_release_catalogue_container";
import ReleaseShowContainer from "./releases/release_show_container";
import Footer from "./footer/footer";
import PersonnelShowContainer from "./personnel/personnel_show_container";
import ScrollIntoView from "./util/scroll_into_view";

const App = () => (
  <div>
    <ScrollIntoView>
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
          <Route exact path="/" component={MainPage} />
        </Switch>
      </main>
      <Footer />
    </ScrollIntoView>
  </div>
);

export default App;
