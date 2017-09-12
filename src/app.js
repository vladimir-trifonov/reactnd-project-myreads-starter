import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './apis/books.api'
import './app.css'
import BooksListComponent from './components/books-list.component'
import SearchBooksPageWithRouter from './components/pages/search-books.page'
import { getBooksShelvesIds } from './utils/books.utils'

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
    books: [],
    loaded: false
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks() {
    BooksAPI.getAll().then((books) => {
      if (books.error) {
        // In case of error
        return console.error(books.error)
      }

      this.setState({ books, booksShelvesIds: getBooksShelvesIds(books), loaded: true })
    })
  }

  // Update book's shelf
  updateBook(book, shelf) {
    this.setState({ loaded: false })
    return BooksAPI.update(book, shelf).then((booksShelvesIds) => {
      let books, updated

      const bookFromState = this.state.books.find(b => b.id === book.id)
      if (bookFromState) {
        // If the book is already on the shelves
        updated = Object.assign({}, bookFromState, {
          shelf: shelf
        })

        // The rest books except the updated
        books = this.state.books.filter(b => b.id !== book.id)
      } else {
        // Use the book info from the search page to add it to he shelves
        updated = Object.assign({}, book, {
          shelf: shelf
        })

        books = this.state.books.slice()
      }

      // The bboks array is immutable
      books = books.concat([updated])
      this.setState({ books, booksShelvesIds, loaded: true })
    })
  }

  render() {
    const {books, loaded, booksShelvesTitles, booksShelvesIds} = this.state
    return (
      <div className='app'>
        <Route exact path='/' render={() => <BooksListComponent
            booksShelvesTitles={booksShelvesTitles}
            books={books}
            loaded={loaded}
            onBookUpdate={this.updateBook.bind(this)}
          />}
        />
        <Route path='/search' render={() => <SearchBooksPageWithRouter
            booksShelvesIds={booksShelvesIds}
            onBookUpdate={this.updateBook.bind(this)}
          />} 
        />
      </div>
    )
  }
}

export default BooksApp
