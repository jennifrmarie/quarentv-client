import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faTv, faTrashAlt, faFilm, faAward, faTrophy } from '@fortawesome/free-solid-svg-icons'

library.add(faThumbsUp, faTv, faFilm, faTrashAlt, faTrophy, faAward)

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);


