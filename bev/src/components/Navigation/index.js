import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';
import Styled from 'styled-components';

const ContainerUl = Styled.ul`
display:flex;
justify-content: space-around;
    li {
        margin-left: 10px;
        list-style-type: none;
    }
`

const Navigation = () => (

    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? (
                    <NavigationAuth authUser={authUser} />
                ) : (
                        <NavigationNonAuth />
                    )
            }
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = ({ authUser }) => (

    <ContainerUl>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        {authUser.roles.includes(ROLES.ADMIN) && (
            <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>)}
        <li>
            <Link to={ROUTES.CHARTS}>Charts</Link>
        </li>
        <li>
            <SignOutButton />
        </li>
    </ContainerUl>
);


const NavigationNonAuth = () => (
    <ContainerUl>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
    </ContainerUl>
);



export default Navigation;