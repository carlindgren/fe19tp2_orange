import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import Navigation from "../Navigation/index";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";

import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import Charts from "../Charts/index";

import Styled from "styled-components";
import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";
import SignOutButton from "../SignOut";
import { Li6 } from "../Navigation/styled";

const App = () => (
  <Router>
    <div>
      {/* <Navigation /> */}
      {/* <Li6>
        <SignOutButton />
      </Li6> */}

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        exact
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.ADMIN} component={AdminPage} />
      <Route exact path={ROUTES.CHARTS} component={Charts} />
    </div>
  </Router>
);

export default withAuthentication(App);
