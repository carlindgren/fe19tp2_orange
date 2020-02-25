import React from 'react';
import Styled from 'styled-components';

const StyledDiv = Styled.div`
width: 100%;
height: 150px;
margin-top: 10px;
margin-bottom: 10px;
text-align: center;
`
const Container = Styled.div`
width: 100%;
    h1 {
        border-bottom: 2px solid black;
        margin-left: 10px;
    }
    h2 {
        font-size: 50px;
    }
`

const DateCard = (props) => {
    return (
        <Container>
            <h1>{props.date}</h1>
            <StyledDiv>
                <h2> {props.data} st</h2>
            </StyledDiv >
        </Container>
    )
}

export default DateCard
