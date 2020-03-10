import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { SignInLink } from '../SignIn';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import styled from 'styled-components';
//import logo from "./logo.png"

const Wrapp = styled.form`
text-align: center;
display: flex;
justify-content: center;
font-size:20px;

`
const StylSign = styled.div`
// border:3px solid black;
//width:450px;
//margin: 30px auto;
//padding:18px;

`
const Field = styled.input`
background-color:white;
width:90%;
height:40px;
border:2px solid black;

`
const Sinput = styled.div`
 margin: 10px auto;
font-weight:bold;
font-size:15px;

`
const Btn = styled.button` 
margin-bottom:20px;
width: 50%;
height:35px;
 border: 1px solid black;
 border-radius:25px;
 box-shadow:none;
 justify-content: center;
 font-weight:bold;
 background-color:#D5D4D3;

`

const SignUpPage = () => (
    <Wrapp>
        <StylSign>

            {/* <img style={{ width: '100px' }}
                src={logo}
                k alt="logo" /> */}

            <h1 style={{ marginTop: '20px' }}>SKAPA KONTO</h1>
            <SignUpForm />
            <SignInLink />


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
                console.log(authUser);
                // Create a user in your Firebase realtime database
                this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                        roles,
                    })
                    .then(() => {
                        this.setState({ ...INITIAL_STATE });
                        this.props.history.push(ROUTES.HOME);
                    })
                    .catch(error => {
                        this.setState({ error });
                        console.log(error);
                    });
            })
            .catch(error => {
                this.setState({ error });
                console.log(error);
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
                            <i class='material-icons'>person</i>
                            Användarnamn:

                            <Field
                                name="username"
                                value={username}
                                onChange={this.onChange}
                                type="text"
                                placeholder="användarnamn"
                            />
                        </label >
                    </Sinput>
                    <Sinput>
                        <label>
                            <i class='material-icons'>mail</i>
                            E-post:



                            <Field
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                type="text"
                                placeholder="E-post"
                            />
                        </label >
                    </Sinput>
                    <Sinput>
                        <label>
                            <i class='material-icons'>lock</i>
                            Lösenord:

                            <Field
                                name="passwordOne"
                                value={passwordOne}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Lösenord"
                            />
                        </label >
                    </Sinput>
                    <Sinput>
                        <label>
                            <i class='material-icons'>lock</i>
                            Upprepa lösernord:

                            <Field
                                name="passwordTwo"
                                value={passwordTwo}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Upprepa lösernord"
                            />
                        </label >
                    </Sinput >
                    <Sinput>

                        <Field
                            name="isAdmin"
                            type="checkbox"
                            checked={isAdmin}
                            onChange={this.onChangeCheckbox}
                        />
                        <label >
                            Admin
                        </label >
                    </Sinput>
                    <Btn disabled={isInvalid} type="submit">
                        Skapa konto
        </Btn>
                    {error && <p>{
                        'E - postadressen används redan av ett annat konto.'}</p>}
                </form >
            </Wrapp >
        );
    }
}


const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Skapa konto</Link>
    </p>
);


const SignUpForm = withRouter(withFirebase(SignUpFormBase));


export default SignUpPage;
export { SignUpForm, SignUpLink };