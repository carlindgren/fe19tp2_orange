import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Icon } from 'antd'
import { Container, Li1, Li2, Li3, Li4, Li5, Li6, NavList } from '../Navigation/styled';
import LocationSelect from './LocationSelect';
import LocationList from './LocationList';
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import { arrOfCities, pieChartObjects } from '../Charts/objectFunctions';
import { withFirebase } from '../Firebase';
import CrimeTypeSelect from './CrimeTypeSelect';
import CrimeTypeList from './CrimeTypeList'


class Watches extends Component {
    constructor(props) {
        super(props);
        this.state = { showDropDown: false, selectedCrimeType: null, selectedLocation: null, userObject: null }
        this.crimeTypes = pieChartObjects.map(elem => (Object.keys(elem)))
        this.cities = arrOfCities.slice(0, 10)
        this.toggleShowDropDown = this.toggleShowDropDown.bind(this)
        this.handleCrimeTypeChange = this.handleCrimeTypeChange.bind(this)
        this.handleCrimeTypeClick = this.handleCrimeTypeClick.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.handleLocationClick = this.handleLocationClick.bind(this)
    }
    //cities = arrOfCities().slice(0, 10);

    componentDidMount() {
        this.props.firebase.user(this.props.authUser.uid).on('value', snapshot => {
            const userObject = snapshot.val();
            console.log(userObject)
            console.log(this.crimeTypes)
            this.setState({ userObject })
        });

    }

    componentWillUnmount() {
        this.props.firebase.user(this.props.authUser.uid).off();
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

    toggleShowDropDown(e) {
        //console.log(e)
        this.setState({ showDropDown: !this.state.showDropDown })
    }
    render() {
        return (
            <React.Fragment>
                <Li1>
                    <Icon type="smile" /><Link to={ROUTES.ACCOUNT}>{this.props.authUser.email}</Link>
                </Li1>

                <Li2 onClick={console.log('hej')/*lägg till alt ta bort någon klass som visar dropDownen. */}>
                    Bevakningar <span onClick={(e) => this.toggleShowDropDown(e)} style={{ border: '1px solid white' }}>NY</span>
                    {/*       <Link to={ROUTES.HOME}>behövs denna här?</Link> */}
                    {/*count.map(elem => { <li key={elem}>{elem}</li> }) */}
                    {this.state.showDropDown && <LocationSelect handleLocationChange={this.handleLocationChange} cities={this.cities} />}
                    {this.state.showDropDown && <CrimeTypeSelect handleCrimeTypeChange={this.handleCrimeTypeChange} crimeTypes={this.crimeTypes} />}

                </Li2>
                {this.props.authUser.roles.includes(ROLES.ADMIN) && (
                    <Li3>
                        <Link to={ROUTES.ADMIN}>Admin</Link>
                    </Li3>
                )}
                <Li4>
                    <Link to={ROUTES.CHARTS}>Charts</Link>
                </Li4>
                <Li5>
                    {this.state.userObject && <LocationList locations={this.state.userObject.locations} handleLocationClick={this.handleLocationClick} />}
                </Li5>
                <li>
                    {this.state.userObject && <CrimeTypeList crimeTypes={this.state.userObject.crimeTypes} handleCrimeTypeClick={this.handleCrimeTypeClick} />}
                </li>
                <Li6>
                    <SignOutButton />
                </Li6>

            </React.Fragment>
        )
    }
}
export default withFirebase(Watches);