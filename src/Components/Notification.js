import { Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { resetNotification } from '../Reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.notification)
  
  const handleShow = () => {
    dispatch(resetNotification())
  }

  if (message !== null) {
    return (
      <Alert className="notification" variant="danger" onClose={handleShow} dismissible>
        <Alert.Heading>
          <strong>Notification!</strong>
        </Alert.Heading>
        <p>
          {message}
        </p>
      </Alert>
    )
  }

  return (
    null
  )
}

export default Notification