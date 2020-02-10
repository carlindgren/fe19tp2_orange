import React from 'react'
import { withAuthorization } from '../Session'

const HomePage = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <p>The Home Page is accessible by every signed in user.</p>
        </div>
    )
}

const condition = AuthUser => AuthUser != null;

export default withAuthorization(condition)(HomePage);