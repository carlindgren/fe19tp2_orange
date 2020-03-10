import React from "react";
import Styled from "styled-components";
import { Icon } from "antd";

const StyledDiv = Styled.div`
position:relative;
width: 100%;
height: 150px;
margin-top: 10px;
text-align: center;
border: 3px solid #65A5ED;

@media (max-width: 575.98px) {
    width: 150px;
    height: 150px;
    
  
  }

`;

// display:flex;
// justify-content: center;
//  align-items: center;

const Container = Styled.div`
position:relative;
margin-top: 40px;
width: 97%;
margin:5px;

    h1 {
        
        text-align: center;
    }
    h2 {
        font-size: 30px;
        margin-bottom: 0;
    }
`;
const redStyle = {
  color: "red",
  fontSize: "20px"
};
const greenStyle = {
  color: "green",
  fontSize: "20px"
};
{
  /*  */
}
const DateCard = ({ date, data, pastData }) => {
  return (
    <Container>
      <h1>{date}</h1>
      <StyledDiv>
        <h2>
          <span>
            {pastData < data ? (
              <Icon style={redStyle} type="caret-up" theme="filled" />
            ) : (
              <Icon style={greenStyle} type="caret-down" theme="filled" />
            )}
          </span>{" "}
          {data} st
        </h2>
        <h3>
          {pastData}
          {/*gårdagens, 14, 60 data osv*/}
        </h3>
      </StyledDiv>
    </Container>
  );
};

export default DateCard;
