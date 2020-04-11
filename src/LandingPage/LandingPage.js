import React, { Component } from 'react'
import './LandingPage.css'
import config from '../config'

export default class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {},
      message: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
    this.submituserLoginForm = this.submituserLoginForm.bind(this);

  };

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

  };


  submituserLoginForm(e) {
    e.preventDefault();
    if (this.validateLoginForm()) {
      let fields = {};

      fields["user_name_login"] = "";
      fields["password_login"] = "";
      this.setState({ fields: fields });

      e.preventDefault()
      const data = {
        user_name: this.state.fields.user_name_login,
        password: this.state.fields.password_login,
      }

      fetch(`${config.API_ENDPOINT}/auth/login`, {
        method: 'post',
        headers: {
          "content-type": "application/json",
        },

        body: JSON.stringify(data)
      })
        .then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          return res.json()
        })
        .then(data => {
          localStorage.authToken = data.authToken;
          this.props.history.push('/dashboard')
        })
        .catch(err => alert('Incorrect username or password'))
    }

  };

  demoLogin(e) {
    e.preventDefault()
    const password = "Test123!"
    const user_name = "guest"
    const data = { user_name, password }

    fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'post',
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(data => {
        localStorage.authToken = data.authToken;
        this.props.history.push('/dashboard')
      })
  };


  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["user_name"] = "";
      fields["password"] = "";
      fields["emailid"] = "";
      this.setState({ fields: fields });
      const data = this.state.fields

      fetch(`${config.API_ENDPOINT}/users`, {
        method: 'post',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)

      })
        .then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          return res.json()
        })
        .then(data => {
          this.props.history.push('/')
        })
        .catch(error => {
          alert(JSON.stringify(error))
        })
    }
  };


  validateLoginForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["user_name_login"]) {
      formIsValid = false;
      errors["user_name_login"] = "*Please enter your username.";
    };


    if (!fields["password_login"]) {
      formIsValid = false;
      errors["password_login"] = "*Please enter your password.";
    };

    this.setState({
      errors: errors,
    });
    return formIsValid;
  };

  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let message = {};
    let formIsValid = true;


    if (!fields["user_name"]) {
      formIsValid = false;
      errors["user_name"] = "*Please enter your username.";
    }


    if (!fields["emailid"]) {
      formIsValid = false;
      errors["emailid"] = "*Please enter your email";
    }

    if (typeof fields["emailid"] !== "undefined") {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["emailid"])) {
        formIsValid = false;
        errors["emailid"] = "*Please enter valid email";
      }
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)) {
        formIsValid = false;
        errors["password"] = "*Must have one uppercase letter, one lowercase letter, a number, and special character.";
      }
    }
    if (formIsValid === true) {
      message["success_message"] = "Account created successfully, please log in!"
      this.setState({
        message: message,
      })
    }

    this.setState({
      errors: errors,
    });

    return formIsValid;

  };



  render() {
    return (
      <div id="main-registration-container">
        <header className="banner">
          <h1 className="app__title">QuarenTV</h1>
          <h4 className="app__header">Make a list of what you want to watch and earn points and badges when you check it off the list</h4>
        </header>
        <div className="login_section">
          <form id="login_form" name="userRegistrationForm" onSubmit={this.submituserLoginForm} >
            <div className="username_div">
              <label>Username:</label>
              <input className="login_input" id="user_name_login" aria-labelledby="user_name_login" type="text" name="user_name_login" value={this.state.fields.user_name_login} onChange={this.handleChange} />
              <div className="errorMsg">{this.state.errors.user_name_login}</div>
            </div>
            <div className="password_section">
              <label>Password:</label>
              <input className="login_input" id="password_login" aria-labelledby="password_login" type="password" name="password_login" value={this.state.fields.password_login} onChange={this.handleChange} />
              <div className="errorMsg">{this.state.errors.password_login}</div>
            </div>
            <button className="login_button">Log In</button>
          </form>
          <button className="demo_button" onClick={this.demoLogin.bind(this)}>Click here for Demo Account</button>

        </div>
        <div id="register">
          <h3 className="registration__header">Don't have an account? Register for one!</h3>
          <form className="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >
            <label className="email_label">Email:</label>
            <input className="registration_forminput" aria-labelledby="email" type="text" id="email" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange} />
            <div className="errorMsg">{this.state.errors.emailid}</div>
            <label>Username:</label>
            <input className="registration_forminput" type="text" aria-labelledby="username" id="username" name="user_name" value={this.state.fields.user_name} onChange={this.handleChange} />
            <div className="errorMsg">{this.state.errors.user_name}</div>

            <label className="password_label">Password:</label>
            <input className="registration_forminput" type="password" aria-labelledby="password" id="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
            <div className="errorMsg">{this.state.errors.password}</div>

            <button name="success_message" className="register_button">Register</button>
            <div className="successMsg">{this.state.message.success_message}</div>
          </form>
        </div>
      </div>

    );
  };


}

