import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Styled from 'styled-components'
import CrimeTypeSelect from '../Watches/CrimeTypeSelect'
import CrimeTypeList from '../Watches/CrimeTypeList'
import LocationList from '../Watches/LocationList'
import LocationSelect from '../Watches/LocationSelect'

import { pieChartObjects, arrOfCities, customCrimeFilter } from '../Charts/objectFunctions'
const FilterContainer = Styled.div`
display:flex;
background-color:black;
z-index:1;
width: 50%;
height:50%;
`
class ChartFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showChartFilter: false,
            showDropDown: false,
            selectedCrimeType: null,
            selectedLocation: null,
            userObject: null
        }

        this.crimeTypes = pieChartObjects.map(elem => (Object.keys(elem)))
        this.cities = arrOfCities.slice(0, 10)
        this.handleCrimeTypeChange = this.handleCrimeTypeChange.bind(this)
        this.handleCrimeTypeClick = this.handleCrimeTypeClick.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.handleLocationClick = this.handleLocationClick.bind(this)
    }

    componentDidMount() {
        this.props.firebase.user(this.props.authUser.uid).on('value', snapshot => {
            const userObject = snapshot.val();
            console.log(userObject)
            console.log(this.crimeTypes)
            this.setState({ userObject })
            console.log(this.props)
        });
    }

    componentWillUnmount() {
        this.props.firebase.user(this.props.authUser.uid).off();
    }

    handleLocationChange(e) {
        if (this.state.userObject.locations) {
            const locations = this.state.userObject.locations;
            locations.push(e.target.value);
            let uniqueLocations = [...new Set(locations)];
            this.props.firebase.user(this.props.authUser.uid).set({
                ...this.state.userObject,
                locations: uniqueLocations
            });
        } else {
            this.props.firebase.user(this.props.authUser.uid).set({
                ...this.state.userObject,
                locations: [e.target.value]
            });
        }
        this.setState({ selectedLocation: e.target.value })
    }
    handleLocationClick(e) {
        if (e.target.closest('span')) {
            const locations = this.state.userObject.locations;
            const locationToRemove = e.target.closest('li').firstChild.textContent;

            const newLocations = locations.filter(l => {
                return (l !== String(locationToRemove));
            });

            this.props.firebase.user(this.props.authUser.uid).set({
                ...this.state.userObject,
                locations: newLocations
            });
        }
    }

    handleCrimeTypeClick(e) {
        if (e.target.closest('span')) {
            const crimeTypes = this.state.userObject.crimeTypes;
            const crimeTypeToRemove = e.target.closest('li').firstChild.textContent;

            const newCrimeTypes = crimeTypes.filter(l => {
                return (l !== String(crimeTypeToRemove));
            });

            this.props.firebase.user(this.props.authUser.uid).set({
                ...this.state.userObject,
                crimeTypes: newCrimeTypes
            });
        }
    }
    handleCrimeTypeChange(e) {
        if (this.state.userObject.crimeTypes) {
            const crimeTypes = this.state.userObject.crimeTypes;
            crimeTypes.push(e.target.value);
            let uniqueCrimeTypes = [...new Set(crimeTypes)];
            this.props.firebase.user(this.props.authUser.uid).set({
                ...this.state.userObject,
                crimeTypes: uniqueCrimeTypes
            });
        } else {
            this.props.firebase.user(this.props.authUser.uid).set({
                ...this.state.userObject,
                crimeTypes: [e.target.value]
            });
        }
        this.setState({ selectedCrimeType: e.target.value })
    }

    render() {

        if (this.state.userObject) {
            console.log(customCrimeFilter(this.state.userObject.locations, this.state.userObject.crimeTypes))
        }
        return (
            <FilterContainer>
                <CrimeTypeSelect handleCrimeTypeChange={this.handleCrimeTypeChange} crimeTypes={this.crimeTypes} />
                <LocationSelect handleLocationChange={this.handleLocationChange} cities={this.cities} />
                {this.state.userObject && <CrimeTypeList crimeTypes={this.state.userObject.crimeTypes} handleCrimeTypeClick={this.handleCrimeTypeClick} />}
                {this.state.userObject && <LocationList locations={this.state.userObject.locations} handleLocationClick={this.handleLocationClick} />}
            </FilterContainer>

        )

    }
}

export default withFirebase(ChartFilter);