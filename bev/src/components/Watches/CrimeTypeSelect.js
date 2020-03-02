import React from 'react';

const CrimeTypeSelect = (props) => (
    <select onChange={(e) => props.handleCrimeTypeChange(e)}>
        {props.crimeTypes.map((crimeType, index) => (<option key={index}>{crimeType}</option>))}
    </select>
)

export default CrimeTypeSelect;