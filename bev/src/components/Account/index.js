import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session'
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import styled from 'styled-components';
const Wrapp = styled.div`
text-align: center;
display: flex;
justify-content: center;
`
const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <Wrapp>
                <div>
                    <h1>Account: {authUser.email}</h1>
                    <PasswordForgetForm />
                    <PasswordChangeForm />
                </div>
            </Wrapp>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => authUser !== null;

export default withAuthorization(condition)(AccountPage)