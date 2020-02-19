import React, { Component } from 'react'; import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase'; import * as ROUTES from '../../constants/routes';
import styled, { css } from 'styled-components';

const Wrapp = styled.form`
text-align: center;
display: flex;
justify-content: center;

`

const StylSign = styled.div`
padding-top:20px;
border:3px solid grey;
margin: 30px auto;
width:450px;
padding: 10px;
`
const PasswordForgetPage = () => (
    <Wrapp>
        <StylSign>
            <div>
                <h1>Forgot Password?</h1>
                <h4>You can reset your password here.</h4>
                <PasswordForgetForm />
            </div>
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

                    <input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"
                    />
                    <button style={{ marginTop: '12px' }}
                        disabled={isInvalid}
                        type="submit">
                        Reset My Password
    </button>
                    {error && <p>{error.message}</p>}

                </form>

            </Wrapp >
        );
    }
}
const PasswordForgetLink = () => (
    <p>

        <Link to={ROUTES.PASSWORD_FORGET}
        >Forgot Password?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };