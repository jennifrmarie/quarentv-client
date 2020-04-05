import React, { Component } from 'react'
import './LandingPage.css'

export default class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {},
    }

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

  }


  submituserLoginForm(e) {
    e.preventDefault();
    if (this.validateLoginForm()) {
        let fields = {};
    
        fields["username_login"] = "";
        fields["password_login"] = "";
        this.setState({fields:fields});
        this.props.history.push('/dashboard')
    }

  }

  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
        let fields = {};
        fields["username"] = "";
        fields["password"] = "";
        fields["emailid"] = "";
        this.setState({fields:fields});
        this.props.history.push('/dashboard')
    }

  }

  validateLoginForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["username_login"]) {
      formIsValid = false;
      errors["username_login"] = "*Please enter your username.";
    }

    if (typeof fields["username_login"] !== "undefined") {
      if (!fields["username_login"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["username_login"] = "*Please enter alphabet characters only.";
      }
    }


    if (!fields["password_login"]) {
      formIsValid = false;
      errors["password_login"] = "*Please enter your password.";
    }

    if (typeof fields["password_login"] !== "undefined") {
      if (!fields["password_login"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["password_login"] = "*Please enter secure and strong password.";
      }
    }
    this.setState({
      errors: errors,
    });
    return formIsValid;
  }

  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "*Please enter your username.";
    }

    if (typeof fields["username"] !== "undefined") {
      if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["username"] = "*Please enter alphabet characters only.";
      }
    }

    
    if (!fields["emailid"]) {
      formIsValid = false;
      errors["emailid"] = "*Please enter your email-ID.";
    }

    if (typeof fields["emailid"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["emailid"])) {
        formIsValid = false;
        errors["emailid"] = "*Please enter valid email-ID.";
      }
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password.";
      }
    }

    this.setState({
      errors: errors,
    });
    return formIsValid;
  }



render() {
  return (
  <div id="main-registration-container">
      <header className="banner">
          <h1 className="app__title">QuarenTV</h1>
          <h4 className="app__header">Let's wash our hands, stay inside, and get to watching. What else are you gonna do?</h4>
          </header>
          <div className="login_section">
               <form id="login_form" name="userRegistrationForm"  onSubmit= {this.submituserLoginForm} >
                <label>Name</label>
                  <input className="login_input" type="text" name="username_login" value={this.state.fields.username_login} onChange={this.handleChange} />
                  <div className="errorMsg">{this.state.errors.username_login}</div>
                  <label>Password</label>
                  <input className="login_input" type="password" name="password_login" value={this.state.fields.password_login} onChange={this.handleChange} />
                  <div className="errorMsg">{this.state.errors.password_login}</div>
                  <button className="login_button">Log In</button>
                </form>
            </div>
              <div id="register">
                  <h3>Don't have an account? Register for one!</h3>
                  <form name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >
                  <label>Name</label>
                  <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} />
                  <div className="errorMsg">{this.state.errors.username}</div>
                  <label>Email:</label>
                  <input type="text" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange}  />
                  <div className="errorMsg">{this.state.errors.emailid}</div>
                  <label>Password</label>
                  <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
                  <div className="errorMsg">{this.state.errors.password}</div>
                  <button className="register_button">Register</button>
                  </form>
              </div>
            </div>

    );
}


}

