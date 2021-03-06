import React, { Component } from 'react'
import './Dashboard.css'
import {v1 as uuid} from 'uuid'
import moment from 'moment';
import AppContext from '../AppContext'
import ListNav from '../ListNav/ListNav'

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
      date: moment(),
    }
    this.context.handleAddEntry(newEntry)
    e.target.reset()
    this.setState({
      title: '',
      strmservice: '',
      date: ''

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
                          <input className="title_input" type="text" required name='title' id='title' />
                        </div>
                        <div className="streaming_section">
                          <label className="strm_label" htmlFor="streaming-service">Streaming Service</label>
                          <select id="streaming-service" name="streaming-service">
                          <option value="...">...</option>
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

              <ListNav /> 
            </div>
        )
    }
}
