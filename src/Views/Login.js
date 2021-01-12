import React, { useState } from 'react'
import { Button, Form, Row, Col, Modal, Container, Card, Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { tryLogin, tryUserCreation } from '../Reducers/loginReducer'
import Notification from '../Components/Notification'
import '../custom-css.css'

const Login = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.usernameLogin.value
    const password = event.target.passwordLogin.value
    dispatch(tryLogin({ username, password }))
  }

  const handleUserCreation = async (event) => {
    event.preventDefault()
    dispatch(tryUserCreation({ username, password }))
    setUsername('')
    setPassword('')
    handleClose()
  }

  return (
    <Container >
      <Notification />
      <Row >
        <Col className="login">
          <Card className="card" bg="light" border="dark">
            <Card.Header className="text-center"><h2>Login</h2></Card.Header>
            <Card.Body>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicText">
                  <Form.Label>Username</Form.Label>             
                    <Form.Control type="text" name="usernameLogin" placeholder="Username" /> 
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="passwordLogin" placeholder="Password"  />
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
      </Col>
      </Row>
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
                  value={username} 
                  placeholder="Choose your username" 
                  onChange={({ target }) => setUsername(target.value)} />
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Form.Label>Password</Form.Label>
              </Form.Row>
              <Form.Row>
                <Form.Control 
                  type="password" 
                  name="passwordRegister" 
                  value={password} 
                  placeholder="Choose a secure password" 
                  onChange={({ target }) => setPassword(target.value)} />
              </Form.Row>
            </Form.Group>
            <Form.Group as={Row} >
              <Col xs={3}>
                <Button type="submit" >Submit</Button>
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