import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from 'antd'

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import * as ROLES from "../../constants/roles";
import { Container, NavList } from './styled'
import Watches from '../Watches';
import Burger from '../Burger/Burger'


const Navigation = () => {

  return (

    <Container>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <NavigationAuth authUser={authUser} />
          ) : (
              <NavigationNonAuth />
            )
        }
      </AuthUserContext.Consumer>
    </Container>
  );
}

const NavigationAuth = ({ authUser }) => {
  const [open, setOpen] = useState(false)

  return (
    <React.Fragment>
      <Burger open={open} setOpen={setOpen} />
      <NavList open={open} setOpen={setOpen}>

        <Watches authUser={authUser} />

      </NavList>
    </React.Fragment>

  );
}
const NavigationNonAuth = () => (
  <NavList>
    <li>
      <Link to={ROUTES.LANDING}></Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Logga in</Link>
    </li>
  </NavList>
);

export default Navigation;
