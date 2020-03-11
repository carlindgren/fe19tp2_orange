import Styled from "styled-components";

export const StyledSelect = Styled.select`
background-color: white;
height: 30px;
width: 140px;
color: black;
font-size: 15px;
outline: none;
margin-left: 10px;

p{
    color:black;
}
    
`;
const IconBox = Styled.div`
float:right;



@media (max-width: 575.98px) {
  display:none;

}


`;

export { IconBox };
