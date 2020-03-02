import React from 'react';

const LocationSelect = (props) => (
    <select onChange={(e) => props.handleLocationChange(e)}>
        {props.cities.map((city, index) => (<option key={index}>{city}</option>))}
    </select>
)

export default LocationSelect;