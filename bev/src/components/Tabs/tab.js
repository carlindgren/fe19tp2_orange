import React from 'react'

import Styled from 'styled-components'
// vid varje sökning skapa en ny tabs i tabsContainer.
//innehållet bör vara charts..
const TabDiv = Styled.div`
width: 10%;
border-right: 1px solid black;
text-align: center;
    &:hover {
        cursor:pointer;
    }
`
const StyledSpan = Styled.span`
    &:hover {
        color: red;
    }
`

const Tab = () => {
    return (
        <TabDiv>
            Brott i sthlm <StyledSpan>X</StyledSpan>
        </TabDiv>
    )
}
export default Tab 