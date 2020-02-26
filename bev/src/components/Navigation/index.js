import React from "react";
import { Link } from "react-router-dom";
import { Icon } from 'antd'

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import * as ROLES from "../../constants/roles";
import Styled from "styled-components";

// style individual links in position we want??
const NavList = Styled.ul`
  padding: 0;
  top: 0;
  left: 0;
  position: absolute;
  width: 14%;
  background: rgb(40, 44, 52);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  list-style: none;
  height: 100vh;
  margin-bottom: 0;
  * {
    text-decoration: none;
    color: white;
    font-family: 'Roboto';
    font-weight: 700;
  }
    &:hover {
    color: #aaa;
  }
`
const Li1 = Styled.li`
position: absolute:
top: 0;
padding: 10px;
display: flex;
justify-content: space-evenly;
align-content: center;
width:100%;
background: rgb(50, 45, 66);
`
const Li2 = Styled.li``
const Li3 = Styled.li`
margin-top: 10px;`
const Li4 = Styled.li`
margin-top: 10px;`
const Li5 = Styled.li`
margin-top: 10px;`
const Li6 = Styled.li`
  *{color: black;}
width: 100%;
position: absolute;
bottom: 0;
`
const Container = Styled.div`
width: 100%;
height: 100%;
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
    <Li1>
      <Icon type="smile" /><Link to={ROUTES.ACCOUNT}>{authUser.email}</Link>
    </Li1>
    <Li2>
      {/*  <Link to={ROUTES.LANDING}>Landing</Link> */}
    </Li2>
    <Li3>
      <Link to={ROUTES.HOME}>Home</Link>
    </Li3>
    {authUser.roles.includes(ROLES.ADMIN) && (
      <Li4>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </Li4>
    )}
    <Li5>
      <Link to={ROUTES.CHARTS}>Charts</Link>
    </Li5>
    <Li6>
      <SignOutButton id='signout' />
    </Li6>
  </NavList>


);

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
