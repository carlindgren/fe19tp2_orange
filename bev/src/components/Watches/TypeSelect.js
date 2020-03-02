import React from 'react';

const TypeSelect = (props) => (
    <select onChange={(e) => props.handleTypeChange(e)}>
        {props.type.map((crimeType, index) => (<option key={index}>{crimeType}</option>))}
    </select>
)

export default TypeSelect;