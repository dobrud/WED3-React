// @flow

import React from 'react'
import { Redirect, Link } from 'react-router-dom'

import { signup } from '../api'

export type Props = {
  /* Callback to submit an authentication request to the server */
  authenticate: (login: string, password: string, callback: (error: ?Error) => void) => void
}
class Signup extends React.Component {
    
  state: {
    username: string,
    usernameHelp?: string,
    usernameState?: string,
    firstName: string,
    firstNameHelp?: string,
    firstNameState?: string,
    lastName: string,
    lastNameHelp?: string,
    lastNameState?: string,
    password: string,
    passwordHelp?: string,
    passwordState?: string,
    confirmPassword: string,
    confirmPasswordHelp?: string,
    confirmPasswordState?: string,
    error: string,
    redirectToDashboard: boolean,
    redirectToReferrer: boolean,
  }
  
  state = {
    username: "",
    usernameHelp: <p className="help">Please specify your username, at least three characters</p>,
    usernameState: "",
    firstName: "",
    firstNameHelp: <p className="help">Please specify your first name</p>,
    firstNameState: "",
    lastName: "",
    lastNameHelp: <p className="help">Please specify your last name</p>,
    lastNameState: "",
    password: "",
    passwordHelp: <p className="help">Please specify your password, at least three characters</p>,
    passwordState: "",
    confirmPassword: "",
    confirmPasswordHelp: <p className="help">Please confirm your password</p>,
    confirmPasswordState: "",
    error: null,
    redirectToDashboard: false,
    redirectToReferrer: false,
  }

  handleUsernameChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      const value = event.target.value;
      if(this.isValidUsername(value)) {
        this.setState({username: value, usernameState: "", usernameHelp: ""});
      } else {
        this.setState({username: value, usernameState: 'is-danger', usernameHelp: <p className="help is-danger">Please specify your username, at least three characters</p>});
      }
    }
  }
  
  handleFirstNameChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      const value = event.target.value;
      if(this.isValidFirstName(value)) {
        this.setState({firstName: value, firstNameState: "", firstNameHelp: ""});
      } else {
        this.setState({firstName: value, firstNameState: 'is-danger', firstNameHelp: <p className="help is-danger">Please specify your first name</p>});
      }
    }
  }

  handleLastNameChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      const value = event.target.value;
      if(this.isValidLastName(value)) {
        this.setState({lastName: value, lastNameState: "", lastNameHelp: ""});
      } else {
        this.setState({lastName: value, lastNameState: 'is-danger', lastNameHelp: <p className="help is-danger">Please specify your last name</p>});
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

      // Check if passwords still match even if the inital password is changed again
      if(this.state.confirmPassword !== "" && !this.equalPasswords(value, this.state.confirmPassword)) {
        this.setState({confirmPasswordState: 'is-danger', confirmPasswordHelp: <p className="help is-danger">Please confirm your password</p>});
      } else {
        this.setState({confirmPasswordState: '', confirmPasswordHelp: ''});
      }
    }
  }

  handleConfirmPasswordChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      const value = event.target.value;
      if(this.isValidPassword(value) && this.equalPasswords(value, this.state.password)) {
        this.setState({confirmPassword: value, confirmPasswordState: "", confirmPasswordHelp: ""});
      } else {
        this.setState({confirmPassword: value, confirmPasswordState: 'is-danger', confirmPasswordHelp: <p className="help is-danger">Please confirm your password</p>});
      }
    }
  }

  isValidPassword(value) {
    return 2 < value.length;
  }

  isValidUsername(value) {
    return 2 < value.length;
  }

  isValidFirstName(value) {
    return 1 < value.length;
  }

  isValidLastName(value) {
    return 1 < value.length;
  }

  equalPasswords(first, second) {
    return first === second;
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    const { username, firstName, lastName, password } = this.state
    signup(username, firstName, lastName, password).then(result => {
      console.log("Signup result ", result)
      this.props.authenticate(username, password, (error) => {
        if(error) {
          this.setState({error});
        } else {
          this.setState({redirectToDashboard: true, error: null});
        }
      });
    }).catch(error =>
      this.setState({error})
    )
  }

  render() {
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to='/login'/>
      )
    }

    if (this.state.redirectToDashboard) {
      return <Redirect to="/dashboard" />;
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
                <label className="label">First name</label>
                <p className="control">
                  <input className={`input + ${this.state.firstNameState}`} pattern=".{2,}" placeholder="First name" type="text" name="firstName" onChange={this.handleFirstNameChanged} value={this.state.firstName} required />
                </p>
                {this.state.firstNameHelp}
              </div>
              <div className="field">
                <label className="label">Last name</label>
                <p className="control">
                  <input className={`input + ${this.state.lastNameState}`} pattern=".{2,}" placeholder="Last name" type="text" name="lastName" onChange={this.handleLastNameChanged} value={this.state.lastName} required />
                </p>
                {this.state.lastNameHelp}
              </div>
              <div>
              </div>
              <div className="field">
                <label className="label">Username</label>
                <p className="control">
                  <input className={`input + ${this.state.usernameState}`} pattern=".{3,}" placeholder="Username" type="text" name="username" onChange={this.handleUsernameChanged} value={this.state.username} required />
                </p>
                {this.state.usernameHelp}
              </div>
              <div className="field">
                <label className="label">Password</label>
                <p className="control">
                  <input className={`input + ${this.state.passwordState}`} pattern=".{3,}" placeholder="Password" type="password" name="password" onChange={this.handlePasswordChanged} value={this.state.password} required />
                </p>
                {this.state.passwordHelp}
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <p className="control">
                  <input className={`input + ${this.state.confirmPasswordState}`} pattern=".{3,}" placeholder="Password" type="password" name="confirmPassword" onChange={this.handleConfirmPasswordChanged} value={this.state.confirmPassword} required />
                </p>
                {this.state.confirmPasswordHelp}
              </div>
              <button className="button is-info" onClick={this.handleSubmit} disabled={!(this.isValidFirstName(this.state.firstName)&&this.isValidLastName(this.state.lastName)&&this.isValidPassword(this.state.password)&&this.isValidUsername(this.state.username)&&this.equalPasswords(this.state.password, this.state.confirmPassword))}>Register</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup
