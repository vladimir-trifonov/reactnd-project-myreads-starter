import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BooksShelf from './books-shelf.component'
import { getBooksByShelf } from '../utils/books.utils'

class BooksList extends Component {
  static propTypes = {
    booksShelves: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(this.props.booksShelves).map(shelf => {
              const booksShelf = this.props.booksShelves[shelf]
              return (
                <BooksShelf key={booksShelf.title} title={booksShelf.title} books={getBooksByShelf(shelf, this.props.books)} />
              )
            })}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksList