import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import DebounceInput from 'react-debounce-input'
import * as BooksAPI from '../../apis/books.api'
import Book from '../book.component'
import sortBy from 'sort-by'

class SearchBooks extends Component {
  static propTypes = {
    location: PropTypes.object,
    history: PropTypes.object.isRequired,
    onBookUpdate: PropTypes.func.isRequired
  }

  state = {
    books: [],
    query: this.props.location.hash.slice(1)
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
  }

  onSearch = (query) => {
    if (query === '') {
      this.setState({ books: [], query })
    } else {
      this.setState({ query })
      this.searchBooks(query)
    }
  }

  searchBooks(query) {
    BooksAPI.search(query).then((books) => {
      if (books.error) {
        this.setState({ books: [] })
        return
      }

      this.setState({ books: books })
    })
  }

  bookShelfUpdated(book, shelf) {
    this.props.onBookUpdate(book, shelf)
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

    // TODO: Loader and empty response message
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
          <ol className='books-grid'>
            {this.renderBooks(sortedBooks)}
          </ol>
        </div>
      </div>
    )
  }
}

const SearchBooksWithRouter = withRouter(SearchBooks)

export default SearchBooksWithRouter
