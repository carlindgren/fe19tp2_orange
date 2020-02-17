import React from 'react';
import Styled from 'styled-components';

const StyledDiv = Styled.div`
width: 30%;
height: 150px;
box-shadow: 0px 3px 3px rgba(0,0,0,0.5);
border: 1px solid black;
margin-top: 10px;
margin-bottom: 10px;
text-align: center;
`

const DateCard = (props) => {
    return (
        <StyledDiv>
            <h1>Senaste {props.date}: <br /> {props.data}</h1>
        </StyledDiv >

    )
}

export default DateCard
