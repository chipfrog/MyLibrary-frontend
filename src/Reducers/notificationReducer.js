
const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data
    case 'RESET_MESSAGE':
      return null 
    default:
      return state  
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_MESSAGE',
    data: null
  }
}

export const setNotification = (message) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: message
  }
}

export default notificationReducer