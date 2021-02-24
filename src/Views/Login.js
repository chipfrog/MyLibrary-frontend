import React, { useState } from 'react'
import { Button, Form, Row, Col, Modal, Container, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { tryLogin, tryUserCreation } from '../Reducers/userReducer'
import Notification from '../Components/Notification'
import '../custom-css.css'

const Login = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
    setNewUsername('')
    setNewPassword('')
    setUsernameError(false)
    setPasswordError(false)
  }  
  const handleShow = () => setShow(true)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const correctInput = (input, minLength) => {
    if (input.length >= minLength) {
      return true
    }
    return false
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(tryLogin({ username, password }))
    setUsername('')
    setPassword('')
  }

  const handleUserCreation = async (event) => {
    event.preventDefault()
    if (!correctInput(newUsername, 5)) {
      setUsernameError(true)
    }
    if (!correctInput(newPassword, 5)) {
      setPasswordError(true)
    }
    else {
      console.log(`Username: ${newUsername}, Password: ${newPassword}`)
      dispatch(tryUserCreation({ newUsername, newPassword }))
      handleClose()
    }
  }

  return (
    <Container fluid className="testi">
      <Notification className="notify"/>
        <Card className="card" bg="light" border="dark">
          <Card.Header className="text-center"><h2>Login</h2></Card.Header>
          <Card.Body>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicText">
                <Form.Label>Username</Form.Label>             
                <Form.Control 
                  type="text" 
                  name="usernameLogin"
                  value={username} 
                  placeholder="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  name="passwordLogin"
                  value={password} 
                  placeholder="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>{' '}
              <Button variant="success" onClick={handleShow} >
                Create User
              </Button>
            </Form> 
          </Card.Body>
        </Card>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false} 
      >
        <Modal.Header closeButton>
          <Modal.Title>Register new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUserCreation} >
            <Form.Group >
              <Form.Row>
                <Form.Label>Username</Form.Label>
              </Form.Row>
              <Form.Row>
                <Form.Control 
                  type="text" 
                  name="usernameRegister" 
                  value={newUsername} 
                  placeholder="Choose your username" 
                  onChange={({ target }) => setNewUsername(target.value)} 
                />
              </Form.Row>
              {usernameError && 
                <Form.Row style={{color: 'red'}}>Username must be at least 5 characters long!</Form.Row>
              }    
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Form.Label>Password</Form.Label>
              </Form.Row>
              <Form.Row>
                <Form.Control 
                  type="password" 
                  name="passwordRegister" 
                  value={newPassword} 
                  placeholder="Choose a secure password" 
                  onChange={({ target }) => setNewPassword(target.value)} 
                />
              </Form.Row>
              {passwordError && 
                <Form.Row style={{color: 'red'}}>Password must be at least 5 characters long!</Form.Row>
              } 
            </Form.Group>
            <Form.Group as={Row} >
              <Col xs={3}>
                <Button type="submit">Submit</Button>
              </Col>
              <Col xs={3} >
                <Button variant="danger" onClick={handleClose} >Cancel</Button>
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default Login