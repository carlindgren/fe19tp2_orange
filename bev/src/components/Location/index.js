import React, { Component } from 'react'
import { geolocated } from 'react-geolocated'
import Styled from 'styled-components'

const StyledDiv = Styled.div`
display:flex;
position: absolute;
left: 50%;
margin-left: -50px;
bottom: 5px;
text-align: center;
`
class Location extends Component {
    render() {
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
            <StyledDiv>
                <span>lat: {this.props.coords.latitude}</span>
                <span>lng: {this.props.coords.longitude}</span>
            </StyledDiv>

        ) : (
                        <div>Getting the location data&hellip; </div>
                    );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Location);