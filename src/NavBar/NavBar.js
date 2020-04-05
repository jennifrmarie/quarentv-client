import React, { Component } from 'react'
import './NavBar.css'
import WatchList from '../WatchList/WatchList'

export default class NavBar extends Component {
    render() {
        return (
            <nav>
                <span className="nav__title">QuarenTV</span>
                <div className="logout_button">Logout</div>
            </nav>
        )
    }
}
