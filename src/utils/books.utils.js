export const getBooksByShelf = (shelf, books) =>
  (books || []).filter(book => book.shelf === shelf)

export const getBooksShelves = books =>
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

export const getBooksIdsByShelves = booksShelvesIds =>
  Object.keys(booksShelvesIds).reduce((booksIdsByShelves, shelf) => {
    const booksIds = booksShelvesIds[shelf]
    booksIds.forEach(id => {
      booksIdsByShelves[id] = shelf
    })

    return booksIdsByShelves
  }, {})
