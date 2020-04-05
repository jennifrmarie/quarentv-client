import React, { Component } from 'react'
import AppContext from './AppContext'
import Dashboard from './Dashboard/Dashboard'
import { Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage'
import NavBar from './NavBar/NavBar'
import dummyStore from './dummy-store';
import './App.css'
import WatchList from './WatchList/WatchList';

export default class App extends Component {
  state = {
    entries: [],
    watched: [],
    entry: '',
  }
  componentDidMount() {
    // fake date loading from API call
    setTimeout(() => this.setState(dummyStore), 600);
  }
  handleAddEntry = entry => {
    this.setState({
      entries: [
        ...this.state.entries,
        entry
      ]
    })
  }

  removeEntry = (entryId) => {
    this.setState({

      watched: this.state.watched.concat(this.state.entries.find(entry => entry.id == entryId)),
      entries: this.state.entries.filter(entry => entry.id !== entryId)
    })
  }

  unwatchEntry = (entryId) => {
    this.setState({

      entries: this.state.entries.concat(this.state.watched.find(entry => entry.id == entryId)),
      watched: this.state.watched.filter(entry => entry.id !== entryId)
    })
  }

  render() {
    const value = {
      entries: this.state.entries,
      entry: this.state.entry,
      handleAddEntry: this.handleAddEntry,
      removeEntry: this.removeEntry,
      watched: this.state.watched,
      unwatchEntry: this.unwatchEntry,
    }
    return (
      <AppContext.Provider value={value}>
        <div className="main_page">
            <Route
             exact path='/dashboard'
             component={NavBar}
            />
          <main>
            <Route 
              exact path='/'
              component={LandingPage}
            />
            <Route
              exact path='/dashboard'
              component={Dashboard}
            />
          </main>
        </div>
      </AppContext.Provider>
    )
  }
}

