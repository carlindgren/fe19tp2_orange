import React, { Component } from "react";
import Styled from "styled-components";

const Close = Styled.div`
position:absolute;

top:0;
right:14px;
font-size:42px;
transform:rotate(45deg);
cursor:pointer;

`;

export class CloseButton extends Component {
  render() {
    return (
      <div>
        <Close>+</Close>
      </div>
    );
  }
}

export default CloseButton;
