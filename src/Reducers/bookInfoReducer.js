const bookInfoReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_BOOK_INFO':
      return action.data
    default:
      return state
  }
}

export const setBookInfo = (bookInfo) => {
  return {
    type: 'SET_BOOK_INFO',
    data: { bookInfo }
  }
}

export default bookInfoReducer