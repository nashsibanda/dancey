import React from "react";
import { Switch } from "react-router-dom";
import { AuthRoute } from "../util/route_util";
import MainPage from "./main/main_page";

const App = () => (
  <Switch>
    <AuthRoute exact path="/" component={MainPage} />
    <AuthRoute exact path="/login" component={LoginFormContainer} />
    <AuthRoute exact path="/register" component={RegisterFormContainer} />
  </Switch>
);

export default App;
