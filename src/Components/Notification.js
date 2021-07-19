import { Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { resetNotification } from '../Reducers/notificationReducer'
import '../custom-css.css'

const Notification = () => {
  const dispatch = useDispatch()
  const notifState = useSelector(state => state.notification)
  
  const handleShow = () => {
    dispatch(resetNotification())
  }

  if (notifState !== null && notifState.show) {
    setTimeout(() => {
      dispatch(resetNotification())
    }, 3000)

    return (
      <Alert className="notification" variant={notifState.type} onClose={handleShow} dismissible>
        <Alert.Heading>
          {notifState.type === 'danger' ?
            <strong>Oops!</strong>
            :
            <strong>You're awesome!</strong>
          }
        </Alert.Heading>
        <p>
          {notifState.message}
        </p>
      </Alert>
    )
  }

  return (
    null
  )
}

export default Notification