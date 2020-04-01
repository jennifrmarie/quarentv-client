import React, { Component } from 'react'
import AppContext from '../AppContext'
import './DashboardList.css'
import moment from 'moment'

export default class DashboardList extends Component {
    static contextType = AppContext

    constructor(props) {
        super(props);
        this.state = {
          score: 0,
          entries: [],
        };
      }

    handleWatchButton = (entryId) => {
        // const entry = this.context.entry

        const newScore = this.state.score + 100
        this.setState({
          score: newScore,
        //   entries: this.state.entries.filter(entry => entry.id !== entryId)
        })
        this.context.removeEntry(entryId)
      }

    render() {
        return (
            <div className='DashboardListNav'>
                <ul className='DashboardList_list'>
                    {this.context.entries.map(entry =>
                        <li key={entry.id}>
                            {entry.title}{' '}
                            {entry.strmservice}{' '}
                            {moment(entry.date).format('MM-DD-YYYY')}
                            <div>
                                <label htmlFor="watched">watched</label>
                                <input type="checkbox" onClick={e => this.handleWatchButton()} name='checkbox' id='checkbox' />
                                <button onClick={e => this.context.removeEntry(entry.id)}>delete</button>
                            </div>
                        </li>)}
                        
                </ul>
                <section>
                    <header>
                        <h3>Scoreboard</h3>
                    </header>
                    <p>Score: {this.state.score} </p>
                    <p>[<em>placeholder for scoreboard</em>]</p>
                    <p>Earn badges for staying home</p>
              </section>
            </div>
        )
    }
}
