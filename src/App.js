import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './apis/books.api'
import './app.css'
import BooksList from './components/books-list.component'
import SearchBooks from './components/pages/search-books.page'

class BooksApp extends React.Component {
  render () {
    return (
      <div className='app'>
        <Route exact path='/' component={BooksList} />
        <Route path='/search' component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
