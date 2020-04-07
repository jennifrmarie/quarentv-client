import React, { Component } from 'react'
import moment from 'moment'
import AppContext from '../AppContext'
import './ListNav.css'
import config from '../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ListNav extends Component {
    static contextType = AppContext

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

        const newScore = this.context.score + points
        
        return fetch(`${config.API_ENDPOINT}/users/score`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${localStorage.authToken}`,
            },
            
            body: JSON.stringify({
                score: newScore,
            })
            
        })
        .then(entry => {
            this.context.addScore(newScore)
          
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
                        <div>Score: {this.context.score}</div>{'\n'}
                        {this.context.userBadges.map(badge => (
                        <li className="scoreboard__list">
                            {this.context.badgesMessage}{'\n'}
                            {badge.img}
                        </li>
                         ))}{'\n'}
                        {this.context.nextMessage}
                    </ul>  
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
