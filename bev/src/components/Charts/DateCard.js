import React from 'react';
import Styled from 'styled-components';
import { Icon } from 'antd'

const StyledDiv = Styled.div`
width: 100%;
height: 150px;
margin-top: 10px;
margin-bottom: 10px;
text-align: center;
`
const Container = Styled.div`
margin-top: 40px;
width: 100%;

    h1 {
        border-bottom: 2px solid black;
        margin-left: 10px;
    }
    h2 {
        font-size: 50px;
        margin-bottom: 0;
    }
`
const redStyle = {
    color: 'red',
    fontSize: '20px',
}
const greenStyle = {
    color: 'green',
    fontSize: '20px',
}
{/*  */ }
const DateCard = ({ date, data, pastData }) => {
    return (
        <Container>
            <h1>{date}</h1>
            <StyledDiv>
                <h2><span>
                    {pastData < data ?
                        <Icon style={redStyle} type="caret-up" theme="filled" />
                        :
                        <Icon style={greenStyle} type="caret-down" theme="filled" />}</span> {data} st</h2>
                <h3>{pastData}{/*gårdagens, 14, 60 data osv*/}</h3>
            </StyledDiv >
        </Container>
    )
}

export default DateCard
