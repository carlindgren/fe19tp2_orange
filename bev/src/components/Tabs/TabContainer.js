import React from 'react'
import Tab from './tab'
import Styled from 'styled-components'
//diven ska ligga på chartssidan.
//ta props från sökresultatet. ex, trafikbrott i sthlm?
const StyledDiv = Styled.div`
display:flex;
flex-direction: row;
border: 1px solid black;
width: 100%;
height: 25px;
`
class TabContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabs: [1, 1, 1],
        }
    }
    render() {
        return (
            <StyledDiv>
                {this.state.tabs.map(tab => <Tab />)}
            </StyledDiv>
        )
    }
}

export default TabContainer