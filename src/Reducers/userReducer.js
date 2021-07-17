import { login } from '../Services/login'
import { addBook, updateBook, deleteBook, addQuote } from '../Services/books'
import { createUser } from '../Services/user'
import { setNotification } from './notificationReducer'
import { setOwnedBookInfo, resetOwnedBookInfo } from '../Reducers/ownedBookReducer'
import { targetAddedBook } from './libraryReducer'

const initialState = {
  user: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return action.data
    case 'CREATE_USER':
      return action.data
    case 'ADD_BOOK':
      return {
        ...state, 
        user_books: [...state.user_books, action.data]}
    case 'UPDATE_BOOK':
      return {
        ...state,
        user_books: state.user_books.map((book) => {
          if (book.id === action.data.id) {
            return {
              ...book,
              rating: action.data.rating,
              review: action.data.review,
              quotes: action.data.quotes,
              read: action.data.read,
              owned: action.data.owned
            }
          }
          return book
        })
      }
    case 'DELETE_BOOK':
      return {
        ...state,
        user_books: state.user_books.filter((book) => book.id !== action.data)
      }
    case 'ADD_QUOTE':
      return {
        ...state,
        user_books: state.user_books.map((book) => {
          if (book.id === action.data.id) {
            return {
              ...book,
              quotes: action.data.quotes
            }
          }
          return book
        })
      }  
    case 'RESET':
      return initialState  
    default:
      return state
  }
}

export const addQuoteToBook = (id, quote, token) => {
  return async dispatch => {
    try {
      const updatedBook = await addQuote(id, quote, token)
      await dispatch(setOwnedBookInfo(updatedBook.data))
      dispatch({
        type: 'ADD_QUOTE',
        data: updatedBook.data
      })
      
    } catch (error) {
      console.log(error)
    }
  }
}

export const tryUserCreation = ({ newUsername, newPassword }) => {
  return async dispatch => {
    try {
      await createUser({ newUsername, newPassword })
      dispatch({
        type: 'CREATE_USER',
        data: initialState
      })
      dispatch(setNotification('success', 'User was successfully created!'))
    } catch (error) {
      dispatch(setNotification('danger', error.response.data.error))
    }
  }
}

export const tryLogin = ({ username, password }) => {
  return async dispatch => {
    try {
      const user = await login({ username, password })
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch(error) {
      dispatch(setNotification('danger', error.response.data.error))
    }
  }
}

export const tryBookUpdate = (book, token) => {
  return async dispatch => {
    try {
      const updatedBook = await updateBook(book, token)
      await dispatch(setOwnedBookInfo(updatedBook.data)) 
      dispatch({
        type: 'UPDATE_BOOK',
        data: book
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const addBookToLibrary = (book, token) => {
  return async dispatch => {
    try {
      const addedBook = await addBook(book, token)
      await dispatch(setOwnedBookInfo(addedBook.data))
      dispatch({
        type: 'ADD_BOOK',
        data: addedBook.data
      })
      console.log(addedBook.data)
      dispatch(setNotification('success', `${addedBook.data.title} added to the library!`))
      dispatch(targetAddedBook(addedBook.data.id))

    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteBookFromLibrary = (id, token) => {
  return async dispatch => {
    try {
      await deleteBook(id, token)
      await dispatch(resetOwnedBookInfo())
      dispatch({
        type: 'DELETE_BOOK',
        data: id
      })
    }
    catch (error) {
      console.log(error)
    }
  }
}

export const tryLogout = () => {
  return {
    type: 'LOGOUT',
    data: initialState
  }
}

export default userReducer