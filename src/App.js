import React, { Component } from 'react'
import AppContext from './AppContext'
import Dashboard from './Dashboard/Dashboard'
import { Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage'
import NavBar from './NavBar/NavBar'
import dummyStore from './dummy-store';
import './App.css'
import config from './config'
import WatchList from './WatchList/WatchList';

export default class App extends Component {
  state = {
    entries: [],
    watched: [],
    entry: '',
  }
  componentDidMount() {
    // fake date loading from API call
    this.getItems();
  }
  handleAddEntry = (entry) => {
    console.log(entry)
    return fetch(`${config.API_ENDPOINT}/items`, {
      method: 'post',
      headers: {
          'content-type': 'application/json',
          "Authorization": `Bearer ${localStorage.authToken}`,
      },
      
      body: JSON.stringify(entry)
      
  })
  .then(res => {
    console.log(res)
    if (!res.ok)
      return res.json().then(e => Promise.reject(e))
      return res.json()
  })
  .then(entry => {
    console.log(entry)
    this.setState({
      entries: [
        ...this.state.entries,
        entry
      ]
    })
    })
  .catch(error => {
    alert(JSON.stringify(error)) 
      
  })
    
  }


  getItems = (score) => {
    return fetch(`${config.API_ENDPOINT}/users/score`, {
      method: 'get',
      headers: {
          'content-type': 'application/json',
          "Authorization": `Bearer ${localStorage.authToken}`,
      },
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
        return res.json()
    })
    .then(score => {   
      console.log(score)
      this.setState({
        score: score
    })
    })
    .catch(error => {
      console.log({ error })
        
    })
    
  }

  removeEntry = (entryId) => {
    return fetch(`${config.API_ENDPOINT}/items/${entryId}`, {
      method: 'delete',
      headers: {
          "Authorization": `Bearer ${localStorage.authToken}`,
      },
  })
  .then(res => {
    if (!res.ok)
      return res.json().then(e => Promise.reject(e))
      return res.json()
  })
  .then(data => {
    this.setState({

      
      entries: this.state.entries.filter(entry => entry.id !== entryId)
    })
  })
  .catch(error => {
    alert(JSON.stringify(error)) 
      
  })
    
  }

  editItem = (entryId, entry) => {
    return fetch(`${config.API_ENDPOINT}/items/${entryId}`, {
      method: 'put',
      headers: {
          'content-type': 'application/json',
          "Authorization": `Bearer ${localStorage.authToken}`,
      },
      
      body: JSON.stringify(entry)
  })
  .then(res => {
    if (!res.ok)
      return res.json().then(e => Promise.reject(e))
      return res.json()
  })
  .then(data => {
    this.setState({
      watched: this.state.watched.concat(this.state.entries.find(entry => entry.id == entryId)),
    })
  })
  .catch(error => {
    alert(error.message)
      
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
      getItems: this.getItems,
      editItem: this.editItem,
      addScore: this.addScore,
    }
    return (
      <AppContext.Provider value={value}>
        <div className="main_page">
            <Route
             exact path='/dashboard'
             component={NavBar}
            />
          <div className="div_main">
            <Route 
              exact path='/'
              component={LandingPage}
            />
            <Route
              exact path='/dashboard'
              component={Dashboard}
            />
          </div>
        </div>
      </AppContext.Provider>
    )
  }
}

