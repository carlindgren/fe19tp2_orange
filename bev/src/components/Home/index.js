import React, { Component } from 'react'
import { withAuthorization } from '../Session'

import Styled from 'styled-components'
import axios from 'axios'
import { Button, Input } from 'antd'
import "antd/dist/antd.css";
import Navigation from "../Navigation";


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
    margin: '8px'
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
            tabs: 0,
        }

    }

    componentDidMount() {
        /*  const CORS = 'https://cors-anywhere.herokuapp.com/'
         const PATH_BASE = 'https://brottsplatskartan.se/'
         //fetch all data from brottplatskartan - save to local storage.
         axios({
             method: 'get',
             url: 'https://cors-anywhere.herokuapp.com/https://brottsplatskartan.se/api/events/?&page=1&limit=50000app=orange'
             //url: '${CORS}${PATH_BASE}'
         })
             .then(res => {
                 //förändrar arrayen med objekt till vår fördel, inte lika mycket data.
                 let result = res.data.data.map(elem => ({
                     id: elem.id,
                     pubdate_iso8601: elem.pubdate_iso8601,
                     pubdate_unix: elem.pubdate_unix, // fixa  pubdate_unix.length === 13 ? pubdate_unix : pubdate_unix + '000';
                     title_type: elem.title_type,
                     title_location: elem.title_location,
                     /* lat: elem.lat,
                     lng: elem.lng, 
                     administrative_area_level_1: elem.administrative_area_level_1,
    }))
                this.setState({ result: result })
console.log(this.state.result)
            })
            .catch (err => {
    console.log(err)
}) */
    }

    render() {



        const { location } = this.state
        return (

            <StyledDiv>
                <Navigation />
                <StyledForm>
                    <Input value={location} type="text" placeholder="sök på ort" style={style}></Input>
                    <Button type="secondary" style={style}>Alla kategorier</Button>
                    <Button type="secondary" style={style}>Stöld</Button>
                    <Button type="secondary" style={style}>Narkotikarelaterade brott</Button>
                    <Button type="secondary" style={style}>Trafikrelaterade brott</Button>
                    <Button type="primary" style={style}>Skapa ny statistik</Button>
                    {/* // onsubmit, skapa en ny sida för att visa dashboarden */}
                    {/* När man klickar på knapparna ska man lägga till en query i sökfältet, knapp tryckt byt färg lägg till query och tvärtom. */}
                </StyledForm>
            </StyledDiv>
        )
    }
}
const condition = AuthUser => AuthUser != null;

export default withAuthorization(condition)(HomePage);