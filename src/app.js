import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './apis/books.api'
import './app.css'
import BooksList from './components/books-list.component'
import SearchBooksWithRouter from './components/pages/search-books.page'

class BooksApp extends React.Component {
  state = {
    booksShelves: {
      currentlyReading: {
        title: 'Currently Reading',
        booksIds: []
      },
      wantToRead: {
        title: 'Want to Read',
        booksIds: []
      },
      read: {
        title: 'Read',
        booksIds: []
      }
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

      this.setState({ books })
    })
  }

  updateBook(book, shelf) {
    return BooksAPI.update(book, shelf).then((booksIdsByShelves) => {
      // TODO: Update the book shelves
      // TODO: Update the books if they were loaded
    })
  }

  render() {
    // TODO: Loader and book page
    return (
      <div className='app'>
        <Route exact path='/' render={() => {
          return <BooksList
            booksShelves={this.state.booksShelves}
            books={this.state.books}
            onBookUpdate={this.updateBook.bind(this)}
          />
        }} />
        <Route path='/search' render={() => {
          // TODO: Add the book shelves to the props
          return <SearchBooksWithRouter onBookUpdate={this.updateBook.bind(this)} />
        }} />
      </div>
    )
  }
}

export default BooksApp
