import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BooksShelf from './books-shelf.component'
import { getBooksByShelf } from '../utils/books.utils'

class BooksList extends Component {
  static propTypes = {
    booksShelvesTitles: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onBookUpdate: PropTypes.func.isRequired
  }

  renderBooksShelves() {
    return Object.keys(this.props.booksShelvesTitles).map(shelf => {
      const booksShelftitle = this.props.booksShelvesTitles[shelf]
      return (
        <BooksShelf
          key={booksShelftitle}
          title={booksShelftitle}
          books={getBooksByShelf(shelf, this.props.books)}
          bookShelfUpdated={this.props.onBookUpdate}
        />
      )
    })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.renderBooksShelves()}
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