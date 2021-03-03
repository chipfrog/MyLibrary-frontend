const initialState = {
  bookInfo: null
}

const ownedBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_OWNED_BOOK_INFO':
      return action.data
    case 'RESET_OWNED_BOOK_INFO':
      return action.data  
    default:
      return state
  }
}

export const setOwnedBookInfo = (bookInfo) => {
  return {
    type: 'SET_OWNED_BOOK_INFO',
    data: { bookInfo }
  }
}

export const resetOwnedBookInfo = () => {
  console.log('reseting book...')
  return {
    type: 'RESET_OWNED_BOOK_INFO',
    data: initialState
  }
}

export default ownedBookReducer