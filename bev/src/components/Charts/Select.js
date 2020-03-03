import React, { Component } from "react";
import Styled from "styled-components";
const Filterbox = Styled.div`
border: 1px solid black;
background-color: white;
width: 500px;
height: 300px;
border-radius: 4px;
text-align: center;
padding: 20px;
position:relative;
`;
const Close = Styled.div`
position:absolute;
top:0;
right:14px;
font-size:42px;
transform:rotate(45deg);
cursor:pointer;
`;

// const obj = {hej: "då"}

//const { hej } = obj; // console.log(hej) // "då"
//const SearchFilter = props => {
const SearchFilter = (props) => {
const { locations, handleLocationChange } = props;

  return (
    <Filterbox>
      <Close>+</Close>
      <label for="cities">Välj Ort</label>
      <select name="cities" onChange={(e) => handleLocationChange(e)}>
          {locations.map(location => (<option value={location}>{location}</option>))}
        {/* <option value="stockholm">{props.id.city}Stockholm</option> */}
   {/*      <option value="malmö">Malmö</option>
        <option value="kalmar">Kalmar</option>
        <option value="jönköping">Jönköping</option> */}
      </select>
    </Filterbox>
  );
};
export default SearchFilter;