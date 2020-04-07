import React, { Component } from 'react'
import AppContext from '../AppContext'
import './DashboardList.css'

import ListNav from '../ListNav/ListNav'

export default class DashboardList extends Component {
    static contextType = AppContext

    constructor(props) {
        super(props);
        this.state = {
          isHidden: true,
          showButton: true,
        };
      }

      toggleHidden () {
        this.setState({
          isHidden: !this.state.isHidden,
          showButton: this.state.showButton
        })
      }




    render() {
        return (
            <div>
              {/* <button onClick={this.toggleHidden.bind(this)} >
                Show what you've previously watched
              </button> */}
              <ListNav />
              {/* {!this.state.isHidden && <WatchList /> } */}


            </div>
        )
    }
}
