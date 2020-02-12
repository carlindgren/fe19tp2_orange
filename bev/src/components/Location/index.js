import React, { Component } from 'react'
import { geolocated } from 'react-geolocated'
import Styled from 'styled-components'

const StyledDiv = Styled.div`
display:flex;
position: absolute;
bottom: 5px;
left: 35%;
align-content: flex-end;
justify-content: space-around;

`
class Location extends Component {
    render() {
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
            <StyledDiv>
                <div>lat: {this.props.coords.latitude}</div>
                <div>lnt: {this.props.coords.longitude}</div>
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