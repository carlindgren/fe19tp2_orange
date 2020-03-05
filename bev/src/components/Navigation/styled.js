import Styled from "styled-components";

const NavList = Styled.ul`
  z-index: 1;
  padding: 0px;
  top: 0;
  left: 0;
  position: absolute;
  width: 300px;
  background: white;
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
    color: black;
    font-family: 'Roboto';
    font-weight: 700;
  }
    &:hover {
    color: #aaa;
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
background: rgb(240, 45, 66);
`;
const Li2 = Styled.li`
`;
const Li3 = Styled.li`
width: 100%;
padding:10px;
color:black;
background-color:#80B2ED;
border-bottom:1px solid black;
      span {
        color:black;
        margin-left:10px;
            &:hover {
                cursor:pointer;
                color:green;
            }
      }
  }
`;
const Li4 = Styled.li`
margin-top:10px;
background:#65A5ED;
width: 100%;
padding:10px;`;
const Li5 = Styled.li`
background:#80B2ED;
width: 100%;
padding:10px;`;
const Li6 = Styled.li`
  *{color: black;}
width: 100%;
position: absolute;
bottom: 0;
`;
const Container = Styled.div`
width: 100%;
height: 100%;
`;

export { Container, Li1, Li2, Li3, Li4, Li5, Li6, NavList };
