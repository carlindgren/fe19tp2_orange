import React from "react";

const CrimeTypeList = props => {
  if (!props.crimeTypes) {
    return null;
  }
  return (
    <ul onClick={e => props.handleCrimeTypeClick(e)}>
      {props.crimeTypes.map((crimeType, index) => (
        <li key={index}>
          {crimeType}
          <span>X</span>
        </li>
      ))}
    </ul>
  );
};

export default CrimeTypeList;
