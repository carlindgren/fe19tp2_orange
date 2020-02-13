import React, { Component } from 'react'
import { withAuthorization } from '../Session'

import Styled from 'styled-components'

import { Button, Input } from 'antd'
import "antd/dist/antd.css";

const StyledDiv = Styled.div`
margin: 0 auto;
width: 50%;
height: 400px;
border: 1px solid black;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 15px;
`

const StyledForm = Styled.form`
display: flex;
flex-direction: column;
`

const style = {
    margin: '8px 8px 8px 8px'
}

class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            result: null,
            robbery: false,
            allCategories: true,
            murder: false,
            location: null,

        }

    }

    render() {
        const { location } = this.state
        return (
            <StyledDiv>
                <StyledForm>
                    <Input value={location} type="text" placeholder="sök på ort" style={style}></Input>
                    <Button type="secondary" style={style}>Alla kategorier</Button>
                    <Button type="secondary" style={style}>Rån</Button>
                    <Button type="secondary" style={style}>Trafikbrott</Button>
                    <Button type="secondary" style={style}>Trafikbrott</Button>
                    <Button type="primary" style={style}>SÖK</Button>
                    {/* // onsubmit, skapa en ny sida för att visa dashboarden */}
                    {/* När man klickar på knapparna ska man lägga till en query i sökfältet, knapp tryckt byt färg lägg till query och tvärtom. */}

                </StyledForm>
            </StyledDiv>
        )
    }
}
const condition = AuthUser => AuthUser != null;

export default withAuthorization(condition)(HomePage);