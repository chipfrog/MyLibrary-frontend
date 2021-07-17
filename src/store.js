import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import bookSearchReducer from './Reducers/bookSearchReducer'
import bookInfoReducer from './Reducers/bookInfoReducer'
import userReducer from './Reducers/userReducer'
import notificationReducer from './Reducers/notificationReducer'
import ownedBookReducer from './Reducers/ownedBookReducer'
import libraryReducer from './Reducers/libraryReducer'

const reducer = combineReducers({
  bookSearch: bookSearchReducer,
  bookInfo: bookInfoReducer,
  ownedBook: ownedBookReducer,
  login: userReducer,
  notification: notificationReducer,
  library: libraryReducer
})

const saveUserState = (state) => {
  try {
    const userState = JSON.stringify(state)
    localStorage.setItem('userState', userState)
  } catch (error) {
    return undefined
  }
}

const getUserState = () => {
  try {
    const userStateInStorage = localStorage.getItem('userState')
    if (userStateInStorage === null) {
      return undefined
    }
    return JSON.parse(userStateInStorage)
  } catch (error) {
    return undefined
  }
}

const stateFromLocalStorage = getUserState()

const store = createStore(
  reducer,
  stateFromLocalStorage,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

store.subscribe(() => {
  saveUserState(store.getState())
})

export default store