import React, { Component } from 'react'
import './LandingPage.css'
import config from '../config'

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
    
        fields["user_name_login"] = "";
        fields["password_login"] = "";
        this.setState({fields:fields});

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
        
    }

  }

  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
        let fields = {};
        fields["user_name"] = "";
        fields["password"] = "";
        fields["emailid"] = "";
        this.setState({fields:fields});

        // const user_name = e.target.user_name.value
        // const password = e.target.password.value
        // const data = { user_name, password }
        const data = this.state.fields
        console.log(data)

        fetch(`${config.API_ENDPOINT}/users`, {
            method: 'post',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
            
        })
        .then(res => {
            if(!res.ok) 
              return res.json().then(e => Promise.reject(e))
              return res.json()
          })
        .then(data => {
            this.props.history.push('/')
        })
        .catch(error => {
            alert(JSON.stringify(error))          
          })
        this.props.history.push('/dashboard')
    }
  }
  

  validateLoginForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["user_name_login"]) {
      formIsValid = false;
      errors["user_name_login"] = "*Please enter your username.";
    }


    if (!fields["password_login"]) {
      formIsValid = false;
      errors["password_login"] = "*Please enter your password.";
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

    if (!fields["user_name"]) {
      formIsValid = false;
      errors["user_name"] = "*Please enter your username.";
    }

    
    if (!fields["emailid"]) {
      formIsValid = false;
      errors["emailid"] = "*Please enter your email";
    }

    if (typeof fields["emailid"] !== "undefined") {
      //regular expression for email validation
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
          <h4 className="app__header">Let's wash our hands, stay inside, and chillout. What else are you gonna do?</h4>
          </header>
          <div className="login_section">
               <form id="login_form" name="userRegistrationForm"  onSubmit= {this.submituserLoginForm} >
                <label>Username:</label>
                  <input className="login_input" placeholder="guest" type="text" name="user_name_login" value={this.state.fields.user_name_login} onChange={this.handleChange} />
                  <div className="errorMsg">{this.state.errors.user_name_login}</div>
                  <label>Password:</label>
                  <input className="login_input" type="password" placeholder="Test123!" name="password_login" value={this.state.fields.password_login} onChange={this.handleChange} />
                  <div className="errorMsg">{this.state.errors.password_login}</div>
                  <button className="login_button">Log In</button>
                </form>
            </div>
              <div id="register">
                  <h3>Don't have an account? Register for one!</h3>
                  <form className="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >
                  <label className="email_label">Email:</label>
                  <input className="registration_forminput" type="text" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange}  />
                  <div className="errorMsg">{this.state.errors.emailid}</div>
                  <label>Username:</label>
                  <input className="registration_forminput" type="text" name="user_name" value={this.state.fields.user_name} onChange={this.handleChange} />
                  <div className="errorMsg">{this.state.errors.user_name}</div>
                  
                  <label>Password:</label>
                  <input className="registration_forminput" type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
                  <div className="errorMsg">{this.state.errors.password}</div>
                  <button className="register_button">Register</button>
                  </form>
              </div>
            </div>

    );
}


}

