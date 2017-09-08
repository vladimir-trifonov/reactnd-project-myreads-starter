import React from 'react'
import Book from './book.component'

function BooksShelf (props) {
  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{props.title}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {props.books.map(book => <Book key={book.title} {...book} />)}
        </ol>
      </div>
    </div>
  )
}

export default BooksShelf
