import React from 'react';
import { withFirebase } from '../Firebase';
import { Icon } from 'antd'
import Styled from 'styled-components'

const StyledButton = Styled.button`
display: flex;
align-content: center;
align-items: center;
justify-content: space-around;
width: 100%;
padding: 10px;
`
const SignOutButton = ({ firebase }) => (
    <StyledButton type="button" onClick={firebase.doSignOut}>
        Logga Ut
    </StyledButton>
);

export default withFirebase(SignOutButton)