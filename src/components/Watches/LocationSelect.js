import React from 'react';
import { StyledSelect } from './styled'
const LocationSelect = (props) => (
    <StyledSelect onChange={(e) => props.handleLocationChange(e)}>
        {props.cities.map((city, index) => (<option key={index}>{city}</option>))}
    </StyledSelect>
)

export default LocationSelect;