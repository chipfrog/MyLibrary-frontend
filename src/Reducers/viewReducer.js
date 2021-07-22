const initialState = {
  scrollToBottom: false,
  highlightBook: false,
  id: null
}

const viewReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'HIGHLIGHT_NEW_BOOK':
      return action.data
    case 'RESET_LIBRARY':
      return initialState
    default:
      return state
  }
}

export const targetAddedBook = (id) => {
  return {
    type: 'HIGHLIGHT_NEW_BOOK',
    data: {
      scrollToBottom: true,
      highlightBook: true,
      id: id
    }
  }
}

export const resetView = () => {
  return {
    type: 'RESET_VIEW'
  }
}

export default viewReducer 