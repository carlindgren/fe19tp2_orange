import React, { Component } from 'react'
import { withRouter,Link } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget'
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import styled from 'styled-components'
import { withAuthentication } from '../Session';
// import logo from "./logo.png";

const Form = styled.div`
display: flex;
 text-align: center;
justify-content: center;
font-size:20px;
`
const StylSign = styled.div`
//width: 450px;
//padding:25px 0;
// margin: 69px auto;
`
const Sinput = styled.div`
margin: 30px auto;
height: 35px;
padding-bottom:70px;
font-weight:bold;
font-size:15px;
`
const Field = styled.input`
background-color:white;
width:100%;
height:40px;
border:2px solid black;
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
 f
 
`
const SignInPage = () => (

    <div>

        <Form>
            

            <StylSign>
                {/*<img style={{ height: '100px' }}
                    src={logo}
                    k alt="logo" /> */}



                <h1 style={{ marginTop: '60px' }}
                >Logga In</h1>

                <SignInForm />
                <PasswordForgetLink />
                <SignUpLink />

            </StylSign>
        </Form>

    </div >

);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        //state points to a new obj in memory which has the values of initialState

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
                        <label>
                            <i class='material-icons'>perm_identity</i>
                            E-post:
                        

                            <Field
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                type="text"
                                placeholder="E-post"

                            />
                            </label>
                    </Sinput>


                        <Sinput>
                            <label>
                            <i class='material-icons'>lock</i>
                            Ange lösernord: 

                                <Field

                                    name="password"
                                    value={password}
                                    onChange={this.onChange}
                                    type="password"
                                    placeholder="Lösenord"

                                />


                            </label>
                        </Sinput>
                        <Btn
                            disabled={isInvalid}
                            type="submit">
                            Logga in
    
             </Btn>

                        {error && <p>{'Inloggningen misslyckades'}</p>}

                </form>
            </Form >
                );
            }
        }
        const SignInForm = compose(
            withRouter,
            withFirebase,
        )(SignInFormBase)

const SignInLink = () => (
    <p>
        <Link to={ROUTES.SIGN_IN} >Logga in</Link>
    </p>
);
        
        export default SignInPage;
        
export {SignInForm,SignInLink}