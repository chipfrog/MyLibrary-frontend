const initialState = {
  scrollToBottom: false,
  highlightBook: false,
  id: null
}

const libraryReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW_BOOK_ADDED':
      return action.data
    case 'RESET_LIBRARY':
      return initialState
    default:
      return state
  }
}

export const targetAddedBook = (id) => {
  return {
    type: 'NEW_BOOK_ADDED',
    data: {
      scrollToBottom: true,
      highlightBook: true,
      id: id
    }
  }
}

export const resetLibraryView = () => {
  return {
    type: 'RESET_LIBRARY'
  }
}

export default libraryReducer 