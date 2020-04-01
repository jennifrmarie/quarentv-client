import React, { Component } from 'react'
import AppContext from './AppContext'
import Dashboard from './Dashboard/Dashboard'
import { Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage'
import NavBar from './NavBar/NavBar'
import dummyStore from './dummy-store';

export default class App extends Component {
  state = {
    entries: [],
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
      entries: this.state.entries.filter(entry => entry.id !== entryId)
    })
  }

  render() {
    const value = {
      entries: this.state.entries,
      entry: this.state.entry,
      handleAddEntry: this.handleAddEntry,
      removeEntry: this.removeEntry,
    }
    return (
      <AppContext.Provider value={value}>
        <div>
          <nav>
              <NavBar />
            </nav>
          <header>
            
          </header>
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

