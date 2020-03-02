import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import styled from 'styled-components';

const Wrapp = styled.form`
text-align: center;
display: flex;
justify-content: center;

`
const StylSign = styled.div`
border:3px solid grey;
width:450px;
margin: 30px auto;
padding:18px;

`
const Sinput = styled.div`
margin: 20px auto;
font-weight:bold;
font-size:15px;

`

const SignUpPage = () => (
    <Wrapp>
        <StylSign>

            <h1>Create Account</h1>
            <SignUpForm />

        </StylSign>
    </Wrapp>
);


const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    error: null,
    locations: [],
    Crimetypes: []

};



class SignUpFormBase extends Component {

    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onChangeCheckbox = event => {
        this.setState({ [event.target.name]: event.target.checked });
    }

    onSubmit = event => {
        const { username, email, passwordOne, isAdmin, watches } = this.state;

        const roles = [];
        if (isAdmin) {
            roles.push(ROLES.ADMIN)
        } else {
            roles.push(ROLES.ACCESS)
        }

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                        roles,
                        watches
                    })
                    .then(() => {
                        this.setState({ ...INITIAL_STATE });
                        this.props.history.push(ROUTES.HOME);
                    })
                    .catch(error => {
                        this.setState({ error });
                    });
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };


    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            isAdmin,
            error,
        } = this.state;


        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';


        return (
            <Wrapp>
                <form onSubmit={this.onSubmit}>
                    <Sinput>
                        <label>
                            Full Name:
                            <br></br>
                            <input
                                name="username"
                                value={username}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Full Name"
                            />
                        </label >
                    </Sinput>
                    <Sinput>
                        <label>
                            Email Adress:
                           <br></br>


                            <input
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Email Address"
                            />
                        </label >
                    </Sinput>
                    <Sinput>
                        <label>
                            Password:
                            <br></br>
                            <input
                                name="passwordOne"
                                value={passwordOne}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Password"
                            />
                        </label >
                    </Sinput>
                    <Sinput>
                        <label>
                            Confirm Password:
                            <br></br>
                            <input
                                name="passwordTwo"
                                value={passwordTwo}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </label >
                    </Sinput >
                    <Sinput>

                        <input
                            name="isAdmin"
                            type="checkbox"
                            checked={isAdmin}
                            onChange={this.onChangeCheckbox}
                        />
                        <label >
                            Admin
                        </label >
                    </Sinput>
                    <button disabled={isInvalid} type="submit">
                        Sign Up
        </button>
                    {error && <p>{error.message}</p>}
                </form >
            </Wrapp >
        );
    }
}


const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);


const SignUpForm = withRouter(withFirebase(SignUpFormBase));


export default SignUpPage;
export { SignUpForm, SignUpLink };