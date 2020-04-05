import React, { Component } from 'react'
import AppContext from '../AppContext'
import moment from 'moment';

export default class WatchList extends Component {
    static contextType = AppContext
    render() {

        return (
            <div className="WatchedListNav">
                <h2>What you've watched</h2>
                <ul className='WatchedList_list'>
                    {this.context.watched.map(entry =>
                        <li className='watchlist_main' key={entry.id}>
                            {entry.title}{' '}
                            {entry.strmservice}{' '}
                            {moment(entry.date).format('MM-DD-YYYY')}
                            <div>
                                <label htmlFor="unwatch">unwatch</label>
                                <input type="checkbox" onClick={e => this.props.handleUnwatchButton(entry.id)} name='checkbox' id='checkbox' />
                            </div>
                        </li>)}
                </ul>
            </div>
        )
    }
}
