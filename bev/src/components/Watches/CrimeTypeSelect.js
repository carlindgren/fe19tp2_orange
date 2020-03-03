import React from 'react';
import { StyledSelect } from './styled'

const CrimeTypeSelect = (props) => (
    <StyledSelect onChange={(e) => props.handleCrimeTypeChange(e)}>
        {props.crimeTypes.map((crimeType, index) => (<option key={index}>{crimeType}</option>))}
    </StyledSelect>
)

export default CrimeTypeSelect;