import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import styled from "styled-components";
import Navigation from "../Navigation/index";
import SignOutButton from "../SignOut";
import { Li6 } from "../Navigation/styled";

const Wrapp = styled.form`
  display: flex;
  //justify-content: center;
  margin: 20px auto;
  width: 280px;
  padding: 35px;

  @media (max-width: 575.98px) {
    margin-top: 300px;
    margin-left: 50px;
  }
`;
const StylSign = styled.div`
  margin-bottom: 25px;
  width: 100%;
`;
const Field = styled.input`
  background-color: white;
  width: 150%;
  height: 40px;
  border: 2px solid black;
`;
const Btn = styled.button`
  margin-bottom: 20px;
  width: 100%;
  height: 35px;
  border: 1px solid black;
  border-radius: 25px;
  box-shadow: none;
  justify-content: center;
  font-weight: bold;
  background-color: #d5d4d3;
  cursor: pointer;
`;

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;
    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";
    return (
      <div>
        <Navigation />
        <Wrapp>
          <form onSubmit={this.onSubmit}>
            <StylSign>
              <h2 style={{ marginBottom: "30px", fontSize: "28px" }}>
                Ändra lösenord
              </h2>

              <label>
                Nytt lösenord
                <Field
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  type="password"
                  // placeholder="New Password"
                />
              </label>
            </StylSign>
            <StylSign>
              <label>
                Bekräfta nytt lösenord
                <Field
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  type="password"
                  //placeholder="Confirm New Password"
                />
              </label>
            </StylSign>
            <Btn disabled={isInvalid} type="submit">
              Update Password
            </Btn>
            {error && <p>{error.message}</p>}
          </form>
        </Wrapp>
      </div>
    );
  }
}
export default withFirebase(PasswordChangeForm);
