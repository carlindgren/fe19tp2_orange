import React, { Component } from "react";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import Navigation from "../Navigation/index";

import Styled from "styled-components";

const Container = Styled.div`
overflow-y: scroll;
overscroll-behavior: smooth;
margin-left: 200px;
display: flex;
flex-direction: column;
height: 100vh;
    @media (max-width: 768px) {
    margin-top:50%;
    margin-left:10px;
    flex-direction: column;
  }
`;

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: []
    };
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }
  handleRemoveClick(uid) {
    if (!uid) {
      console.log("No user specified");
      return;
    }

    const { users } = this.state;
    let currentUser = users.find(user => user.uid === uid);
    currentUser.uid = null;
    if (currentUser.roles) {
      // user has roles already, probably admin.
      currentUser.roles = currentUser.roles.filter(
        role => role !== ROLES.ACCESS
      ); // ["ADMIN", "ACCESS"]
    }
    console.log(currentUser);
    this.props.firebase.user(uid).set({
      ...currentUser
    });
  }

  handleAddClick(uid) {
    if (!uid) {
      console.log("No user specified");
      return;
    }

    const { users } = this.state;
    let currentUser = users.find(user => user.uid === uid);
    currentUser.uid = null;
    if (currentUser.roles) {
      // user has roles already, probably admin.
      currentUser.roles.push(ROLES.ACCESS); // ["ADMIN", "ACCESS"]
    } else {
      currentUser.roles = [ROLES.ACCESS];
    }

    this.props.firebase.user(uid).set({
      ...currentUser
    });
  }
  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <Navigation />
        <Container>
          <h1
            style={{
              textAlign: "center",
              marginTop: "20px"
            }}
          >
            ADMIN
          </h1>

          <h4 style={{ textAlign: "center", marginBottom: "50px" }}>
            The Admin Page is accessible by every signed in admin user.
          </h4>

          {loading && <div>Loading ...</div>}
          <ul>
            {/* {"email":"lisliesse@yahoo.se","roles":["ADMIN"],"username":"liesse","uid":"DbsGSsXSOZRowyBjIjwnDhXade83"} */}
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
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: "70px"
                  }}
                >
                  <strong> {/*Roll:*/} </strong>{" "}
                  {user.roles ? (
                    !user.roles.includes(ROLES.ACCESS) ? (
                      <button onClick={() => this.handleAddClick(user.uid)}>
                        blockera
                      </button>
                    ) : (
                      <button onClick={() => this.handleRemoveClick(user.uid)}>
                        tillåt
                      </button>
                    )
                  ) : (
                    <button onClick={() => this.handleAddClick(user.uid)}>
                      blockera
                    </button>
                  )}
                </span>
                <hr />
              </li>
            ))}
          </ul>
          {/* <UserList users={users} /> */}
        </Container>
      </div>
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

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(withAuthorization(condition), withFirebase)(AdminPage);
