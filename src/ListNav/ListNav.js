import React, { Component } from 'react'
import moment from 'moment'
import AppContext from '../AppContext'
import './ListNav.css'
import config from '../config'
import WatchList from '../WatchList/WatchList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ListNav extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = {
          score: 400,
          entries: [],
          badges: [
            {id: 1, score: 500, name: 'badge1', img: <FontAwesomeIcon icon="thumbs-up"></FontAwesomeIcon>},
            {id: 2, score: 1000, name: 'badge2', img: <FontAwesomeIcon icon="thumbs-up"></FontAwesomeIcon>},
            {id: 3, score: 1500, name: 'badge3', img: <FontAwesomeIcon icon="thumbs-up"></FontAwesomeIcon>},
            {id: 4, score: 2000, name: 'badge4', img: <FontAwesomeIcon icon="thumbs-up"></FontAwesomeIcon>},
          ],
          userBadges: [],
        }
    }

    handleUnwatchButton = (entryId) => {
        this.updateScore(-100)
        this.context.unwatchEntry(entryId)
        this.context.editItem(entryId, {
            watched: 0,
        })
    }

    handleWatchButton = (entryId) => {
        this.updateScore(100)
        this.context.editItem(entryId, {
            watched: 1,
        })
        this.context.removeEntry(entryId)
    }

    updateScore(points) {

        const newScore = this.state.score + points
        const newBadge = this.state.badges
        const newBadges = this.state.badges.filter(b => b.score <= newScore)
        const nextBadges = this.state.badges.filter(b => b.score > newScore)
        let nextMessage
        let badgesMessage;
        if (newBadges.length > this.state.userBadges.length) {
            badgesMessage = `You got a new badge!: '${newBadges[newBadges.length - 1].name}'` 
        }
        if (nextBadges.length > 0) {
            nextMessage = `You need ${nextBadges[0].score - newScore} points til your next badge` 
        }
        return fetch(`${config.API_ENDPOINT}/users/score`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${localStorage.authToken}`,
            },
            
            body: JSON.stringify({
                score: newScore,
                badge: newBadge
            })
            
        })
        .then(entry => {
          this.setState({
            score: newScore,
            badge: newBadge,
            userBadges: newBadges,
            badgesMessage: badgesMessage,
            nextMessage: nextMessage
          })
          })
        .catch(error => {
          alert(JSON.stringify(error)) 
            
        })
    }
    render() {
        
        return (
            <div className="DashboardListNav">
                <ul className='DashboardList_list'>
                    <h2 className="list__title">Get to work!</h2>
                    {this.context.entries.map(entry =>
                        <li key={entry.id} className="watchlist_main">
                            {entry.title}{' '}
                            {entry.strmservice}{' '}
                            {moment(entry.date).format('M-D-YY')}
                            <div className="delete_button" onClick={e => this.context.removeEntry(entry.id)}><FontAwesomeIcon icon="trash-alt"></FontAwesomeIcon></div>
                            <div className="checkbox_input">
                                <input type="checkbox" onClick={e => this.handleWatchButton(entry.id)} name='checkbox' id='checkbox' />
                                <label htmlFor="watched">watched</label>
                                
                            </div>
                            
                            
                        </li>)}
                </ul>
                
                <section className="scoreboard_section">
                        <h2 className="scoreboard__title">Scoreboard</h2>
                        <ul className="scoreboard_list_section">
                        <div>Score: {this.state.score}</div>{'\n'}
                        {this.state.userBadges.map(badge => (
                        <li className="scoreboard__list">
                            {this.state.badgesMessage}{'\n'}
                            {badge.img}
                        </li>
                         ))}{'\n'}
                        {this.state.nextMessage}</ul>  
                </section>
                  {/* <section className="watched_list"> */}
                  {/* <WatchList 
                    handleUnwatchButton = {this.handleUnwatchButton}
                    /> */}
                {/* </section> */}
            </div>
        )
    }
}
