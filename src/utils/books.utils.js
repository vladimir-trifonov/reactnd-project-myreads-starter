export const getBooksByShelf = (shelf, books) =>
  (books || []).filter(book => book.shelf === shelf)
