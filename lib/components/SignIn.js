import React, { Component } from 'react';
import firebase, { signIn, signOut } from '../firebase';
import ActionButtons from './ActionButtons';

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  newUser(newUser) {
    this.setState({ user: newUser });
    this.props.handleUser(this.state.user);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((newUser) => this.newUser(newUser));
  }

  render() {
    const user = this.state.user;

    if (user) {
      return (
        <div className="LogOut">
          <p className="LogText">
            Logged in as
            <span className="LogInName">
              {user.displayName}
            </span>
            ({user.email})
          </p>
          <ActionButtons
            id="LogOutButton"
            text="Log Out"
            handleClick={() => signOut()}
          />
        </div>
      );
    }

    if (!user) {
      return (
        <div className="LogIn">
          <ActionButtons
            id="LogInButton"
            text="Log In"
            handleClick={() => signIn()}
          />
        </div>
      );
    }
  }
}
