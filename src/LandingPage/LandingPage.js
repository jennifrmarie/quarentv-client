import React, { Component } from 'react'
import './LandingPage.css'

export default class LandingPage extends Component {
  handleSubmit = (e) => {
      e.preventDefault()
      const user_name = e.target.user_name.value
      const password = e.target.password.value
      const data = { user_name, password }
      this.props.history.push('/dashboard')
  }
    render() {
        return (
            <main role="main">
            <header role="banner">
              <h1>QuarenTV</h1>
              <h2>What else are you going to do?</h2>
            </header>
            <section>
              <header>
                  <h3>Let's wash our hands, stay inside, and get to watching</h3>
              </header>
              <form onSubmit={this.handleSubmit} class='login-form'>
                <div>
                    <label for="user_name">Username</label>
                    <input type="text" name='user_name' id='user_name' />
                  </div>
                  <div>
                    <label for="password">Password</label>
                    <input type="password" name='password' id='password' />
                  </div>
                  <button type='submit'>LogIn</button>
            </form>
            </section>
            <section>
              <header>
                  <h3>Start Watching Now</h3>
              </header>
              <form onSubmit={this.handleSubmit} class='signup-form'>
                  <div>
                    <label for="first-name">First name</label>
                    <input placeholder='First Name' type="text" name='first-name' id='first-name' />
                  </div>
                  <div>
                    <label for="last-name">Last name</label>
                    <input type="text" name='last-name' id='last-name' placeholder='Last Name' />
                  </div>
                  <div>
                    <label for="username">Email</label>
                    <input type="text" name='username' id='username' />
                  </div>
                  <div>
                    <label for="password">Password</label>
                    <input type="password" name='password' id='password' />
                  </div>
                  <button type='submit'>Sign Up</button>
              </form>
            </section>
        </main>
        )
    }
}
