import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './apis/books.api'
import './app.css'
import BooksList from './components/books-list.component'
import SearchBooksWithRouter from './components/pages/search-books.page'

const booksShelves = {
  currentlyReading: {
    title: 'Currently Reading'
  },
  wantToRead: {
    title: 'Want to Read'
  },
  read: {
    title: 'Read'
  }
}

class BooksApp extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  state = {
    booksShelves,
    books: [],
    loaded: false
  }

  getBooks() {
    BooksAPI.getAll().then((books) => {
      if (books.error) {
        return console.error(books.error)
      }

      this.setState({ books, loaded: true })
    })
  }

  componentDidMount() {
    this.props.location.pathname === '/' && this.getBooks()
  }

  componentWillReceiveProps() {
    !this.state.loaded && this.getBooks()
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => {
          return <BooksList booksShelves={this.state.booksShelves} books={this.state.books} />
        }} />
        <Route path='/search' component={SearchBooksWithRouter} />
      </div>
    )
  }
}

const BooksAppWithRouter = withRouter(BooksApp)

export default BooksAppWithRouter
