import React, { Component } from 'react'
import AppContext from './AppContext'
import Dashboard from './Dashboard/Dashboard'
import { Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage'
import NavBar from './NavBar/NavBar'
import './App.css'
import config from './config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class App extends Component {
  state = {
    entries: [],
    watched: [],
    entry: '',
    score: 0,
    userBadges: [],
    badges: [
      {id: 1, score: 500, name: 'badge1', img: <FontAwesomeIcon icon="thumbs-up"></FontAwesomeIcon>},
      {id: 2, score: 1000, name: 'badge2', img: <FontAwesomeIcon icon="thumbs-up"></FontAwesomeIcon>},
      {id: 3, score: 1500, name: 'badge3', img: <FontAwesomeIcon icon="thumbs-up"></FontAwesomeIcon>},
      {id: 4, score: 2000, name: 'badge4', img: <FontAwesomeIcon icon="thumbs-up"></FontAwesomeIcon>},
    ],
    
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
    .then(data => {   
      this.addScore(data.score)
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
      watched: this.state.watched.concat(this.state.entries.find(entry => entry.id === entryId)),
    })
  })
  .catch(error => {
    alert(error.message)
      
  })
  }

  addScore = (score) => {
    const newBadge = this.state.badges
        const newBadges = this.state.badges.filter(b => b.score <= score)
        const nextBadges = this.state.badges.filter(b => b.score > score)
        let nextMessage
        let badgesMessage;
        if (newBadges.length > this.state.userBadges.length) {
            badgesMessage = `You got a new badge!: '${newBadges[newBadges.length - 1].name}'` 
        }
        if (nextBadges.length > 0) {
            nextMessage = `You need ${nextBadges[0].score - score} points til your next badge` 
        }
    this.setState({
      score,
      badge: newBadge,
      userBadges: newBadges,
      badgesMessage: badgesMessage,
      nextMessage: nextMessage
    })
  }

  unwatchEntry = (entryId) => {
    this.setState({

      entries: this.state.entries.concat(this.state.watched.find(entry => entry.id === entryId)),
      watched: this.state.watched.filter(entry => entry.id !== entryId)
    })
  }

  render() {
    const value = {
      entries: this.state.entries,
      entry: this.state.entry,
      score: this.state.score,
      handleAddEntry: this.handleAddEntry,
      removeEntry: this.removeEntry,
      watched: this.state.watched,
      unwatchEntry: this.unwatchEntry,
      getItems: this.getItems,
      editItem: this.editItem,
      addScore: this.addScore,
      badges: this.state.badges,
      userBadges: this.state.userBadges,
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

