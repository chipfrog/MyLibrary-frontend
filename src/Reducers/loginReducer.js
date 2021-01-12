import { login } from '../Services/login'
import { addBook } from '../Services/books'
import { createUser } from '../Services/user'
import { setNotification } from './notificationReducer'

const initialState = {
  user: null,
}

const loginReducer = (state = initialState, action) => {
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
      return state
    case 'DELETE_BOOK':
      return state
    case 'RESET':
      return initialState  
    default:
      return state
  }
}

export const tryUserCreation = ({ username, password }) => {
  return async dispatch => {
    try {
      await createUser({ username, password })
      dispatch({
        type: 'CREATE_USER',
        data: initialState
      })
    } catch (error) {
      dispatch(setNotification('User already exists!'))
    }
  }
}

export const tryLogin = ({ username, password }) => {
  console.log(`username: ${username}, password: ${password}`)
  return async dispatch => {
    try {
      const user = await login({ username, password })
      dispatch({
        type: 'LOGIN',
        data: user
      })

    } catch(error) {
      dispatch(setNotification('Wrong credentials!'))
    }
  }
}

export const addBookToLibrary = (book, token) => {
  return async dispatch => {
    try {
      await addBook(book, token)
      
      const bookInfo = {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        linkToCoverImage: book.volumeInfo.imageLinks.thumbnail,
        rating: book.rating,
        quotes: book.quotes
      }
      dispatch({
        type: 'ADD_BOOK',
        data: bookInfo
      })
    } catch (error) {
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

export default loginReducer