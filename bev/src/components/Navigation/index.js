import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import * as ROLES from "../../constants/roles";
import styled from "styled-components";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
            <NavigationNonAuth />
          )
      }
    </AuthUserContext.Consumer>
  </div>
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

const NavList = styled.ul`

  li {
    margin-top: 10px;
  }
  //float: right;
  margin: 0;
  background: 
  color: black;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  font-size: 15px;
  list-style: none;
  width: 50%;
`;

const StyledLink = styled(Link)`
  list-style: none;
  text-decoration: none;
  color: black;
  font-family: "Montserrat Subrayada", sans-serif;

  &:hover {
    color: #aaa;
  }
`;

export default Navigation;
