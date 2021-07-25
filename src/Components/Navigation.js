import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown, Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { tryLogout, tryUserDeletion } from '../Reducers/userReducer'
import { searchBooks, startSearch, initSearchResults } from '../Reducers/bookSearchReducer'
import { FaCog } from 'react-icons/fa'
import { FaSignOutAlt } from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'
import '../custom-css.css'
import DeleteConfirmationUser from './DeleteConfirmationUser'

const Navigation = ({ showSort, sortDesc, sortAsc }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector(state => state.login.token)

  const [show, setShow] = useState(false)
  
  const handleLogout = () => {
    dispatch(initSearchResults())
    dispatch(tryLogout())
    history.push('/')
  }

  const fetchBooks = (event) => {
    event.preventDefault()
    const filter = event.target.filter.value
    dispatch(startSearch())
    history.push('/search')
    dispatch(searchBooks(filter))
    clearSearhBar()
  }

  const handleDelete = () => {
    dispatch(tryUserDeletion(token))
  }

  const clearSearhBar = () => {
    document.getElementById('search bar').reset()
  }

  const navDropDownIcon = (<FaCog size={35} />)

  return (
    <>
    <Navbar className="navigation" fixed="top" bg="dark" variant="dark" >
      <Navbar.Brand as={Link} to={"/"}>My Library</Navbar.Brand>
      <Nav className="mr-auto">
        {showSort && 
          <NavDropdown className="ml-auto" title="Sort by" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => sortDesc('rating')} >Rating: Highest-Lowest</NavDropdown.Item>
            <NavDropdown.Item onClick={() => sortAsc('rating')}>Rating: Lowest-Highest</NavDropdown.Item>
            <NavDropdown.Item onClick={() => sortAsc('title')}>Title: A-Z</NavDropdown.Item>
            <NavDropdown.Item onClick={() => sortDesc('title')}>Title: Z-A</NavDropdown.Item>
            <NavDropdown.Item onClick={() => sortAsc('author')}>Author: A-Z</NavDropdown.Item>
            <NavDropdown.Item onClick={() => sortDesc('author')}>Author: Z-A</NavDropdown.Item>
          </NavDropdown>
        }
        <Nav.Link as={Link} to={"/search"}>Book finder</Nav.Link>
      </Nav>
      <Nav className="ml-auto">
        <Form className="mr-1" onSubmit={fetchBooks} inline id={'search bar'}>
          <Form.Control name="filter" type="text" placeholder="Search from Google Books"/>
          <Button type="submit">Search</Button>
        </Form>
        <NavDropdown alignRight title={navDropDownIcon} >
          <NavDropdown.Item onClick={handleLogout} >
            <Row>
              <Col>
                <span className="mr-2" >Logout</span>
                <FaSignOutAlt />
              </Col>
            </Row>            
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item className="text-danger" onClick={() => setShow(true)}  >
            <Row>
              <Col>
                <span className="mr-2" >Delete Account</span>
                <FaTrashAlt  />
              </Col>
            </Row>
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
    <Container>
      <DeleteConfirmationUser show={show} setShow={setShow} handleDelete={handleDelete} />  
    </Container>
    </>
  )
}

export default Navigation