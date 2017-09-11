import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import DebounceInput from 'react-debounce-input'
import * as BooksAPI from '../../apis/books.api'
import Book from '../book.component'
import sortBy from 'sort-by'
import { getUpdatedBooks } from '../../utils/books.utils'
import Loader from 'react-loader'

class SearchBooks extends Component {
  static propTypes = {
    location: PropTypes.object,
    history: PropTypes.object.isRequired,
    onBookUpdate: PropTypes.func.isRequired,
    booksShelvesIds: PropTypes.object.isRequired
  }

  state = {
    books: [],
    query: this.props.location.hash.slice(1),
    loaded: false
  }

  updateQuery(query) {
    this.props.history.push(`/search#${query}`)
  }

  componentDidMount() {
    this.onSearch(this.state.query)
  }

  componentWillReceiveProps(nextProps) {
    const { hash } = nextProps.location
    this.props.location.hash !== hash && this.onSearch(hash.slice(1))

    if (this.props.booksShelvesIds !== nextProps.booksShelvesIds) {
      const updated = getUpdatedBooks(this.state.books, nextProps.booksShelvesIds)
      this.setState({ books: updated })
    }
  }

  onSearch = (query) => {
    if (query === '') {
      this.setState({ books: [], query, loaded: true })
    } else {
      this.setState({ query })
      this.searchBooks(query)
    }
  }

  searchBooks(query) {
    this.setState({ loaded: false })
    BooksAPI.search(query).then((books) => {
      if (books.error) {
        this.setState({ books: [], loaded: true })
        return
      }

      const updated = getUpdatedBooks(books, this.props.booksShelvesIds)
      this.setState({ books: updated, loaded: true })
    })
  }

  bookShelfUpdated(book, shelf) {
    this.setState({ loaded: false })
    this.props.onBookUpdate(book, shelf)
      .then(() => this.setState({ loaded: true }))
  }

  renderBooks(books) {
    return books.map(book =>
      <Book
        key={book.id}
        {...book}
        onShelfUpdate={this.bookShelfUpdated.bind(this)}
      />
    )
  }

  render() {
    const { query, books } = this.state
    const sortedBooks = books.sort(sortBy('id'))

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>Close</Link>
          <div className='search-books-input-wrapper'>
            <DebounceInput
              value={query}
              debounceTimeout={500}
              onChange={e => this.updateQuery(e.target.value)}
              placeholder='Search by title or author'
            />
          </div>
        </div>
        <div className='search-books-results'>
          <Loader loaded={this.state.loaded}>
            <ol className='books-grid'>
              {this.renderBooks(sortedBooks)}
            </ol>
          </Loader>
        </div>
      </div>
    )
  }
}

const SearchBooksWithRouter = withRouter(SearchBooks)

export default SearchBooksWithRouter
