const initialState = {
  type: null,
  show: false,
  message: ''
}


const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'RESET_NOTIFICATION':
      return action.data 
    default:
      return state  
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION',
    data: {
      type: null,
      show: false,
      message: ''
    }
  }
}

export const setNotification = (type, message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      type: type,
      show: true,
      message: message
    }
  }
}

export default notificationReducer