const ownedBookReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_OWNED_BOOK_INFO':
      return action.data
    case 'RESET_OWNED_BOOK_INFO':
      return null  
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

export default ownedBookReducer