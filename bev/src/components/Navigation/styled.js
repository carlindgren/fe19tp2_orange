import Styled from "styled-components";

const Burger = Styled.div`
  position: absolute;
  top: 5%;
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
`;

const NavList = Styled.ul`
  z-index: 9;
  transition: ease-in-out ;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  padding: 0px;
  top: 0;
  left: 0;
  position: absolute;
  width: 210px;
 /*  background: white; */
  border-right:1px solid black;
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
    font-size: 17px;
  }
      &:hover {
        color: white;
  }
  @media (max-width: 575.98px) {
    height: 50%;
    width:100%;
    border-right:none;
    box-shadow: 4px 4px 10px #595959;
  }
`;
const Li1 = Styled.li`
position: relative;
top: 0;
padding: 10px;
display: flex;
justify-content: space-evenly;
align-content: center;
width:100%;
background: rgb(68, 94, 116);
border-bottom: 1px solid black;
border-right: 1px solid black;


`;
const Li2 = Styled.li`
background:rgb(78, 107, 131);
width:100%;
border-right: 1px solid black;
display: flex;
justify-content: center;
 align-items: center; 


`;
const Li3 = Styled.li`
width: 100%;
padding:10px;
color:black;
background-color:rgb(68, 94, 116);
border-bottom:1px solid black;
border-right: 1px solid black;
color: white;


      span {
        color: white;
      margin-left:10px;
      padding: 2px;
          &:hover {
              cursor:pointer;
              color:green;
          }
    }
  @media (min-width: 575.98px) {
    span {
      display: none;
          }
`;
const Li4 = Styled.li`
margin-top:10px;
background: rgb(68, 94, 116);
width: 100%;
padding:10px;
border-right: 1px solid black;

`;
const Li5 = Styled.li`
background:rgb(78, 107, 131);
width: 100%;
padding:10px;
border-right: 1px solid black;
border-bottom: 1px solid black;


`;

const Li6 = Styled.li`
  *{color: black;}
width: 100%;
position: absolute;
bottom: 0;

@media (max-width: 575.98px) {
 display:none;

}
`;
const Container = Styled.div`
width: 100%;
height: 100%;
`;

export { Container, Burger, Li1, Li2, Li3, Li4, Li5, Li6, NavList };
