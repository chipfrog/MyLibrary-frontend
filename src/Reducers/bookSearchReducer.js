import { getBooks } from '../Services/books'

const initialState = {
  books: [],
  filter: undefined
}

const bookSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BOOK_SEARCH':
      return {
        books: action.data.books,
        filter: action.data.filter
      }
    case 'INIT_SEARCH_RESULTS':
      return action.data
    default:
      return state
  }
}

export const initSearchResults = () => {
  return {
    type: 'INIT_SEARCH_RESULTS',
    data: initialState
  }
}

export const searchBooks = (filter) => {
  return async dispatch => {
    const books = await getBooks(filter)
    dispatch({
      type: 'BOOK_SEARCH',
      data: { books, filter }
    })
  }
}

export default bookSearchReducer