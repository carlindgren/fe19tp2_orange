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

export class FilterButton extends Component {
  render() {
    return <SearchBtn>Börja bevaka</SearchBtn>;
  }
}

export default FilterButton;
