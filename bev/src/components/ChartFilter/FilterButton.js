import React, { Component } from "react";
import Styled from "styled-components";

const SearchBtn = Styled.button`
width:100%;
color: black;
height: 50px;
align-self: flex-end;
outline: none;
position:absoute;
cursor:pointer;
border: 1px solid white;


`;

// const ButtonContainer = Styled.div`
// height:100%;
// width:100%;
// position:relative;
// display:flex;
// display:inline-block;
// border: 2px solid red;
// z-index:10000;

// `;
//#C0C4E0; #80B2ED;

export class FilterButton extends Component {
  render() {
    return <SearchBtn>Börja bevaka</SearchBtn>;
  }
}

export default FilterButton;
