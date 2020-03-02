import React from 'react';

const LocationList = (props) => {
    if (!props.locations) {
        return null;
    }
    return (
        <ul onClick={(e) => props.handleLocationClick(e)}>
            {props.locations.map((location, index) => (<li key={index}>{location}<span> X</span></li>))}
        </ul>
    )
}

export default LocationList;