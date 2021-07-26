import { getBooks } from '../Services/books'

const initialState = {
  books: [],
  filter: undefined,
  searching: false
}

const bookSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BOOK_SEARCH':
      return {
        books: action.data.books,
        filter: action.data.filter,
        searching: false
      }
    case 'SEARCH_STARTED':
      return {
        books: [],
        filter: undefined,
        searching: true
      }
    case 'INIT_SEARCH_RESULTS':
      return action.data
    default:
      return state
  }
}

export const startSearch = () => {
  return {
    type: 'SEARCH_STARTED'
  }
} 

export const initSearchResults = () => {
  return {
    type: 'INIT_SEARCH_RESULTS',
    data: initialState
  }
}

export const searchBooks = (filter, searchWords) => {
  return async dispatch => {
    let books = await getBooks(filter, searchWords)
    if (!Array.isArray(books)) {
      books = []
    }
    dispatch({
      type: 'BOOK_SEARCH',
      data: { books, filter }
    })
  }
}

export default bookSearchReducer