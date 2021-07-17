import { Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { resetNotification } from '../Reducers/notificationReducer'
import '../custom-css.css'

const Notification = ({ variant }) => {
  const dispatch = useDispatch()
  const notifState = useSelector(state => state.notification)
  
  const handleShow = () => {
    dispatch(resetNotification())
  }

  if (notifState !== null) {
    return (
      <Alert className="notification" variant={notifState.type} onClose={handleShow} dismissible>
        <Alert.Heading>
          <strong>Oops!</strong>
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