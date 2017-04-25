// @flow

import type Event from 'Event';

import React from 'react';
import { Redirect, Link } from 'react-router-dom';

export type Props = {
  /* Callback to submit an authentication request to the server */
  authenticate: (login: string, password: string, callback: (error: ?Error) => void) => void,
  /* We need to know what page the user tried to access so we can 
     redirect after logging in */
  location: {
    state?: {

      from: string,
    }
  }
}

class Login extends React.Component {

  props: Props;

  state: {
    login: string,
    usernameHelp?: string,
    usernameState?: string,
    password: string,
    passwordHelp?: string,
    passwordState?: string,
    error?: Error,
    redirectToReferrer: boolean,
  };

  state = {
    login: "",
    usernameHelp: <p className="help">Please specify your username, at least three characters</p>,
    usernameState: "",
    password: "",
    passwordHelp: <p className="help">Please specify your password, at least three characters</p>,
    passwordState: "",
    error: undefined,
    redirectToReferrer: false,
  };

  handleLoginChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      const value = event.target.value;
      if(this.isValidUsername(value)) {
        this.setState({login: value, usernameState: "", usernameHelp: ""});
      } else {
        this.setState({login: value, usernameState: 'is-danger', usernameHelp: <p className="help is-danger">Please specify your username, at least three characters</p>});
      }
    }
  }

  handlePasswordChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      const value = event.target.value;
      if(this.isValidPassword(value)) {
        this.setState({password: value, passwordState: "", passwordHelp: ""});
      } else {
        this.setState({password: value, passwordState: 'is-danger', passwordHelp: <p className="help is-danger">Please specify your password, at least three characters</p>});
      }
    }
  }

  isValidPassword(value) {
    return 2 < value.length;
  }

  isValidUsername(value) {
    return 2 < value.length;
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    const { login, password } = this.state
    this.props.authenticate(login, password, (error) => {
      if(error) {
        this.setState({error});
      } else {
        this.setState({redirectToReferrer: true, error: null});
      }
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
        
    return (
      <div>
        <nav className="nav has-shadow">
          <div className="container">
            <div className="nav-left">
              <a className="nav-item app-title">
                💰💰💰 🤑
              </a>
            </div>

          <span className="nav-toggle" onClick={() => {var menu = document.querySelector('.nav-right.nav-menu'); menu.classList.toggle('is-active');}}>
            <span></span>
            <span></span>
            <span></span>
          </span>

          <div className="nav-right nav-menu">
            <Link className="nav-item" to="/login">
              Home
            </Link>
            <Link className="nav-item" to="/signup">
              <span className="button is-info">
                Register
              </span>
            </Link>
            </div>
          </div>
      </nav>
      <div className="container">
        <div className="column is-half is-offset-one-quarter">
          <form>
            <div className="field">
              <label className="label">Username</label>
              <p className="control">
                <input className={`input + ${this.state.usernameState}`} pattern=".{3,}" placeholder="User" type="text" name="username" value={this.state.login} onChange={this.handleLoginChanged} required />
              </p>
              { this.state.usernameHelp }
            </div>
            <div className="field">
              <label className="label">Password</label>
              <p className="control">
                <input className={`input + ${this.state.passwordState}`} pattern=".{3,}" placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handlePasswordChanged} required />
              </p>
              { this.state.passwordHelp }
            </div>
            <button className="button is-info" onClick={this.handleSubmit} disabled={!(this.isValidPassword(this.state.password)&&this.isValidUsername(this.state.login))}>Login</button>
          </form>
        </div>
      </div>
    </div>
    )
  }
}

export default Login
