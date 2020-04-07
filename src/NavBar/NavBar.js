import React, { Component } from 'react'
import './NavBar.css'

export default class NavBar extends Component {

    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
      }

      handleAppClick = () => {
          this.props.history.push('/dashboard')
      }
    render() {
        return (
            <nav>
                <span onClick={this.handleAppClick} className="nav__title">QuarenTV</span>
                <div onClick={this.handleLogout} className="logout_button">Logout</div>
            </nav>
        )
    }
}
