import React, { Component } from 'react'
import moment from 'moment'
import AppContext from '../AppContext'
import './ListNav.css'
import WatchList from '../WatchList/WatchList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ListNav extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = {
          score: 0,
          entries: [],
          badges: [
            {id: 1, score: 500, name: 'Just getting started', img: <FontAwesomeIcon icon="thumbs-up"></FontAwesomeIcon>},
            {id: 2, score: 1000, name: 'badge2'},
            {id: 3, score: 1500, name: 'badge3'},
            {id: 4, score: 2000, name: 'badge4'}
          ],
          userBadges: [],
        }
    }

    handleUnwatchButton = (entryId) => {
        this.updateScore(-100)
        this.context.unwatchEntry(entryId)
    }

    handleWatchButton = (entryId) => {
        this.updateScore(100)
        this.context.removeEntry(entryId)
    }

    updateScore(points) {
        const newScore = this.state.score + points
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
        this.setState({
          score: newScore,
          userBadges: newBadges,
          badgesMessage: badgesMessage,
          nextMessage: nextMessage
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
                            {moment(entry.date).format('MM-DD-YYYY')}
                            <div>
                                <label htmlFor="watched">watched</label>
                                <input type="checkbox" onClick={e => this.handleWatchButton(entry.id)} name='checkbox' id='checkbox' />
                                <button onClick={e => this.context.removeEntry(entry.id)}>delete</button>
                            </div>
                        </li>)}
                </ul>
                
                <section className="scoreboard_section">
                        <h2 className="scoreboard__title">Scoreboard</h2>
                    <p>Score: {this.state.score} </p>
                    <p>{this.state.userBadges.map(badge => (
                        <li className="scoreboard__list">
                            {this.state.badgesMessage}{'  '}
                            {badge.img}
                        </li>
                    ))}</p>
                    <p>{this.state.nextMessage}</p>
                    
                    
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
