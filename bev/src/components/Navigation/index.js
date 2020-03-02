import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from 'antd'

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import * as ROLES from "../../constants/roles";
import { Container, Li1, Li2, Li3, Li4, Li5, Li6, NavList } from './styled'
import Watches from '../Watches';



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


  return (
    <NavList>
      <React.Fragment>
        <Watches authUser={authUser} />
        {/*        <Li1>
          <Icon type="smile" /><Link to={ROUTES.ACCOUNT}>{authUser.email}</Link>
        </Li1>

        <Li2 onClick={console.log('hej')}>
          Bevakningar <span onClick={onClick} style={{ border: '1px solid white' }}>NY</span>
        </Li2> */}
        {/*       <Link to={ROUTES.HOME}>behövs denna här?</Link> */}
        {/*count.map(elem => { <li key={elem}>{elem}</li> }) */}

        {/*  {authUser.roles.includes(ROLES.ADMIN) && (
          <Li4>
            <Link to={ROUTES.ADMIN}>Admin</Link>
          </Li4>
        )}
        <Li5>
          <Link to={ROUTES.CHARTS}>Charts</Link>
        </Li5>
        <Li6>
          <SignOutButton />
        </Li6> */}

      </React.Fragment>
    </NavList>


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
