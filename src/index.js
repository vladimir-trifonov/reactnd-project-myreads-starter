import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import BooksAppWithRouter from './app'
import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <BooksAppWithRouter />
  </BrowserRouter>,
  document.getElementById('root')
)
