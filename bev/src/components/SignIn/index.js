import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget'
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import styled, { css } from 'styled-components'

const Form = styled.div`
display: flex;
flex-direction:column;
text-align: center;
`
const StylSign = styled.div`

border: 3px solid grey;
border-sizing:border-box;
width: 450px;
margin: 30px auto;
padding:25px 0;

`
const Sinput = styled.div`
margin: 30px auto;
height: 35px;
width:100%;
padding-bottom:50px;
font-weight:bold;
font-size:15px;

`

const SignInPage = () => (

    <div>
        <Form>
            <StylSign>

                <h1>Sign In</h1>

                <SignInForm />
                <PasswordForgetLink />
                <SignUpLink />

            </StylSign>
        </Form>
    </div>

);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
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
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <Form>

                <form onSubmit={this.onSubmit}>
                        <Sinput>
                            <label>Email Adress:<br></br>
                                <input
                                    name="email"
                                    value={email}
                                    onChange={this.onChange}
                                    type="text"
                                    placeholder="Enter Email"

                                />
                            </label>
                        </Sinput>


                        <Sinput>
                            <label>Enter Password: <br></br>
                                <input
                                    name="password"
                                    value={password}
                                    onChange={this.onChange}
                                    type="password"
                                    placeholder="Enter Password"
                                />
                            </label>
                        </Sinput>
                        <button style={{ marginBottom: '20px' }}
                            disabled={isInvalid}
                            type="submit">
                            Sign In
    
             </button>

                        {error && <p>{error.message}</p>}

                </form>
            </Form>
                );
            }
        }
        const SignInForm = compose(
            withRouter,
            withFirebase,
        )(SignInFormBase)
        
        export default SignInPage;
        
export {SignInForm}