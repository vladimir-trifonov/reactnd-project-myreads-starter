import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './apis/books.api'
import './app.css'
import BooksList from './components/books-list.component'
import SearchBooksWithRouter from './components/pages/search-books.page'
import { getBooksShelves } from './utils/books.utils'

class BooksApp extends React.Component {
  state = {
    booksShelvesTitles: {
      currentlyReading: 'Currently Reading',
      wantToRead: 'Want to Read',
      read: 'Read'
    },
    booksShelvesIds: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    books: []
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks() {
    BooksAPI.getAll().then((books) => {
      if (books.error) {
        return console.error(books.error)
      }

      this.setState({ books, booksShelvesIds: getBooksShelves(books) })
    })
  }

  updateBook(book, shelf) {
    return BooksAPI.update(book, shelf).then((booksShelvesIds) => {
      let books, updated

      const bookFromState = this.state.books.find(b => b.id === book.id)
      if (bookFromState) {
        updated = Object.assign({}, bookFromState, {
          shelf: shelf
        })

        books = this.state.books.filter(b => b.id !== book.id)
      } else {
        updated = Object.assign({}, book, {
          shelf: shelf
        })

        books = this.state.books.slice()
      }

      books = books.concat([updated])
      this.setState({ books, booksShelvesIds })
    })
  }

  render() {
    // TODO: Loader and book page
    return (
      <div className='app'>
        <Route exact path='/' render={() => {
          return <BooksList
            booksShelvesTitles={this.state.booksShelvesTitles}
            books={this.state.books}
            onBookUpdate={this.updateBook.bind(this)}
          />
        }} />
        <Route path='/search' render={() => {
          return <SearchBooksWithRouter
            onBookUpdate={this.updateBook.bind(this)}
            booksShelvesIds={this.state.booksShelvesIds}
          />
        }} />
      </div>
    )
  }
}

export default BooksApp
