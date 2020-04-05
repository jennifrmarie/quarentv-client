import React, { Component } from 'react'
import './Dashboard.css'
import {v1 as uuid} from 'uuid'
import moment from 'moment';
import AppContext from '../AppContext'
import DashboardList from '../DashboardList/DashboardList'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      entry: '',
      title: '',
      strmservice: '',
    };
  }

static contextType = AppContext





  handleSubmit = e => {
    e.preventDefault()
    const newEntry = {
      id: uuid(),
      title: e.target['title'].value,
      strmservice: e.target['streaming-service'].value,
      // date: moment.format('MM-DD-YYYY')
    }
    this.context.handleAddEntry(newEntry)
    console.log(newEntry)
    e.target.reset()
    this.setState({
      title: '',
      strmservice: '',

    })
  }
  
    render() {
        return (
            <div className="div_main">
                    
                    <form onSubmit={this.handleSubmit} className='watch-form'>
                    <div className="form__section">
                    <h3 className="form__header">What do you want to watch?</h3>
                        <div className="title_section">
                          <label className="title_label" htmlFor="title">Title</label>
                          <input className="title_input" placeholder='Title' type="text" name='title' id='title' />
                        </div>
                        <div>
                          <label htmlFor="streaming-service">Streaming Service</label>
                          <select id="streaming-service" name="streaming-service">
                            <option value="netflix">Netflix</option>
                            <option value="hulu">Hulu</option>
                            <option value="amazon-prime">Amazon Prime</option>
                            <option value="hbo">HBO</option>
                            <option value="showtime">showtime</option>
                            <option value="other">other</option>
                          </select>
                        </div>
                        <button className="submit_button" type='submit'>Add to list</button>
                      </div>
                    </form>

              <DashboardList />
            </div>
        )
    }
}
