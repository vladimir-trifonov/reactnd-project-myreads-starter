export const getBooksByShelf = (shelf, books) =>
  (books || []).filter(book => book.shelf === shelf)

// Get the ids of the books, which are added to a shelf
export const getBooksShelvesIds = books =>
  (books || []).reduce((shelves, book) => {
    if (book.shelf) {
      shelves[book.shelf].push(book.id)
    }

    return shelves
  }, {
    currentlyReading: [],
    wantToRead: [],
    read: []
  })

// Get object where the kyes are booksIds and the values are shelves titles
const _getBooksIdsByShelves = booksShelvesIds =>
  Object.keys(booksShelvesIds).reduce((booksIdsByShelves, shelf) => {
    const booksIds = booksShelvesIds[shelf]
    booksIds.forEach(id => {
      booksIdsByShelves[id] = shelf
    })

    return booksIdsByShelves
  }, {})

// Update books shelves
export const getUpdatedBooks = (books, booksShelvesIds) => {
  if (!booksShelvesIds) {
    return books
  }

  const bookIdsByShelves = _getBooksIdsByShelves(booksShelvesIds)
  const updated = (books || []).map(book => Object.assign({}, book, {
    shelf: bookIdsByShelves[book.id] || 'none'
  }))

  return updated
}
