import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import BooksApp from './app'
import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <BooksApp />
  </BrowserRouter>,
  document.getElementById('root')
)
