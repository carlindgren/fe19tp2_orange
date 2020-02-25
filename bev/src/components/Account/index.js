import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session'
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (

            <div>
                <h1 style={{ textAlign: 'center', marginTop: '40px' }}>Account: {authUser.email}</h1>
                {/* <PasswordForgetForm /> */}
                <PasswordChangeForm /> */}
            </div>
        )}

    </AuthUserContext.Consumer >
);

const condition = authUser => authUser !== null;

export default withAuthorization(condition)(AccountPage)