import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import * as ROLES from "../../constants/roles";
import Styled from "styled-components";


const NavList = Styled.ul`
  position: absolute;
  width: 10%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  color: black;
  font-size: 15px;
  list-style: none;
  height: 100vh;
  margin-bottom: 0;
  li {
    margin-top: 10px;
  }
`
const Container = Styled.div`
width: 100%;
`

const StyledLink = Styled(Link)`
  text-decoration: none;
  color: black;
  font-family: 'Roboto';
  font-weight: 700;

  &:hover {
    color: #aaa;
  }
`


const Navigation = () => (
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

const NavigationAuth = ({ authUser }) => (
  <NavList>
    <li>
      <StyledLink to={ROUTES.LANDING}>Landing</StyledLink>
    </li>
    <li>
      <StyledLink to={ROUTES.HOME}>Home</StyledLink>
    </li>
    <li>
      <StyledLink to={ROUTES.ACCOUNT}>Account</StyledLink>
    </li>
    {authUser.roles.includes(ROLES.ADMIN) && (
      <li>
        <StyledLink to={ROUTES.ADMIN}>Admin</StyledLink>
      </li>
    )}
    <li>
      <StyledLink to={ROUTES.CHARTS}>Charts</StyledLink>
    </li>
    <li>
      <SignOutButton />
    </li>
  </NavList>
);

const NavigationNonAuth = () => (
  <NavList>
    <li>
      <StyledLink to={ROUTES.LANDING}></StyledLink>
    </li>
    <li>
      <StyledLink to={ROUTES.SIGN_IN}>Logga in</StyledLink>
    </li>
  </NavList>
);


export default Navigation;
