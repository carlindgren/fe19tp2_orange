import React from "react";
import { withFirebase } from "../Firebase";
import { Icon } from "antd";
import Styled from "styled-components";

const StyledButton = Styled.button`
display: flex;
align-content: center;
align-items: center;
justify-content: space-around;
width: 100px;
padding: 10px;
margin:auto;
background-color: rgb(78, 107, 131);
border: 1px solid black;
border-radius: 15px;
color: white;
outline: none;
cursor: pointer;

`;
const SignOutButton = ({ firebase }) => (
  <StyledButton type="button" onClick={firebase.doSignOut}>
    Logga Ut
  </StyledButton>
);

export default withFirebase(SignOutButton);
