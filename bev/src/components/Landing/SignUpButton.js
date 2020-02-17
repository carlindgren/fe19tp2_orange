import React from "react";
import styled from "styled-components";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";

const SignUpButton = () => (
  <div>
    <Link to={ROUTES.SIGN_UP}>
      {" "}
      <SignUpBtn>SKAPA KONTO</SignUpBtn>
    </Link>
  </div>
);

const SignUpBtn = styled.button`
  width: 160px;
  height: 50px;
  color: black;
  background-color: #eee;
  border: 2px solid #aaa;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  cursor: pointer;
  font-family: Monaco;
  font-weight: bold;

  &:hover {
    color: #aaa;
  }
`;

export default SignUpButton;
