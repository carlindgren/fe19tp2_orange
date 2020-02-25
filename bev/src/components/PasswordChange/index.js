import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import styled, { css } from 'styled-components';

const Wrapp = styled.form`
display: flex;
justify-content: center;
margin: 30px auto;
border:3px solid grey;
width:280px;
padding: 35px;


`
const StylSign = styled.div`
margin-bottom: 25px;
width:100%;



`


const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { passwordOne } = this.state;
        this.props.firebase.doPasswordUpdate(passwordOne)
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
        const { passwordOne, passwordTwo, error } = this.state;
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '';
        return (
            <Wrapp>

                <form onSubmit={this.onSubmit}>
                    <StylSign>
                        <h2 style={{ marginBottom: '30px', fontSize: '28px' }}>Ändra lösenord</h2>
                        <input
                            name="passwordOne"
                            value={passwordOne}
                            onChange={this.onChange}
                            type="password"
                            placeholder="New Password"
                        /></StylSign>
                    <StylSign>
                        <input
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Confirm New Password"
                        /></StylSign>
                    <button style={{ width: '85%' }}
                        disabled={isInvalid}
                        type="submit">
                        Update Password
        </button>
                    {error && <p>{error.message}</p>}
                </form >
            </Wrapp>
        );
    }
}
export default withFirebase(PasswordChangeForm);