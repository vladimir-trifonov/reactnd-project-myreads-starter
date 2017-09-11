import React from 'react'
import PropTypes from 'prop-types'
import Book from './book.component'
import sortBy from 'sort-by'

function BooksShelf (props) {
  const sortedBooks = props.books ? props.books.sort(sortBy('id')) : []

  const renderBooks = (books) => {
    return books.map(book =>
      <Book
        key={book.id}
        {...book}
        onShelfUpdate={props.bookShelfUpdated}
      />
    )
  }

  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{props.title}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {renderBooks(sortedBooks)}
        </ol>
      </div>
    </div>
  )
}

BooksShelf.propTypes = {
  books: PropTypes.array,
  title: PropTypes.string.isRequired
}

export default BooksShelf
