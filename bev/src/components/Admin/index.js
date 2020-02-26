import React, { Component } from 'react';
import { compose } from 'recompose'

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

import Styled from 'styled-components';

const Container = Styled.div`
overflow-y: scroll;
overscroll-behavior: smooth;
margin-left: 14%;
display: flex;
flex-direction: column;
justify-content: space-around;
border: 1px solid black;
height: 100vh;
    * {
        margin-left: 10px;
    }
`


class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            users: [],

        };
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.setState({ loading: true });


        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();

            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));

            this.setState({
                users: usersList,
                loading: false,
            });
        });

    }


    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    handleClick() {
        const { users } = this.state
        console.log(users)
        console.log(ROLES.ACCESS)
        //users.roles.push(ROLES.ACCESS)
    }
    render() {
        const { users, loading } = this.state;

        return (
            <Container>
                <h1>Admin</h1>
                <p>
                    The Admin Page is accessible by every signed in admin user.
                </p>
                {loading && <div>Loading ...</div>}
                <ul>
                    {users.map(user => (
                        <li key={user.uid}>
                            <span>
                                <strong> ID: </strong> {user.uid}
                            </span>
                            <span>
                                <strong> E-Mail: </strong> {user.email}
                            </span>
                            <span>
                                <strong> Username: </strong> {user.username}
                            </span>
                            <span>
                                <strong> Roll: </strong> {user.roles ? user.roles : <button onClick={this.handleClick}>tillåt</button>}
                            </span>
                            <hr />
                        </li>
                    ))}
                </ul>
                {/* <UserList users={users} /> */}
            </Container>
        );
    }
}


/* const UserList = ({ users }) => (

    <ul>
        {users.map(user => (
            <li key={user.uid}>
                <span>
                    <strong> ID: </strong> {user.uid}
                </span>
                <span>
                    <strong> E-Mail: </strong> {user.email}
                </span>
                <span>
                    <strong> Username: </strong> {user.username}
                </span>
                <span>
                    <strong> Roll: </strong> {user.roles ? user.roles : <button>tillåt</button>}
                </span>
                <hr />
            </li>
        ))}
    </ul>
); */


const condition = authUser =>
    authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
    withAuthorization(condition),
    withFirebase
)(AdminPage);