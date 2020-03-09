import React, { Component } from 'react'; import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase'; import * as ROUTES from '../../constants/routes';
import styled, { css } from 'styled-components';
// import { Link, withRouter } from 'react-router-dom';
import { SignInLink } from '../SignIn';

const Wrapp = styled.form`
text-align: center;
display: flex;
justify-content: center;
//width:450px;
margin: 30px auto;
font-size:18px;
`

const StylSign = styled.div`
padding-top:40px;
//border:3px solid grey;
`
const Field = styled.input`
background-color:white;
width:80%;
height:40px;
border:2px solid black;

`
const Btn = styled.button` 
//margin-top:20px;
width: 50%;
height:35px;
 border: 1px solid black;
 border-radius:25px;
 box-shadow:none;
 justify-content: center;
 font-weight:bold;
 background-color:#D5D4D3;
 `


const PasswordForgetPage = () => (
    <Wrapp>
        <StylSign>


            <h1>Glömt Lösenord?</h1>
            <h4 style={{ marginBottom: "30px" }}>Du kan återställa lösenord här.</h4>
            <i class='material-icons' id="change">lock_open</i>

            <PasswordForgetForm />
            <SignInLink />

        </StylSign>
    </Wrapp >
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;
        this.props.firebase.doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
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

        const { email, error } = this.state;

        const isInvalid = email === '';

        return (
            <Wrapp>
                <form
                    onSubmit={this.onSubmit}>

                    <label style={{ fontWeight: "bold" }}>Ange E-post:
                    <Field
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            type="text"
                            placeholder="E-post"
                        />
                    </label>
                    <Btn style={{ marginTop: '12px' }}
                        disabled={isInvalid}
                        type="submit">
                        Reset Password
    </Btn>
                    {error && <p>{error.message}</p>}

                </form>

            </Wrapp >
        );
    }
}
const PasswordForgetLink = () => (
    <p>

        <Link to={ROUTES.PASSWORD_FORGET}
        >Glömt Lösenord?</Link>

    </p>
);
const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);
export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };