import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown, Form, Button, Row, Col, Container, NavItem, InputGroup, DropdownButton } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { tryLogout, tryUserDeletion } from '../Reducers/userReducer'
import { searchBooks, startSearch, initSearchResults } from '../Reducers/bookSearchReducer'
import { FaCog } from 'react-icons/fa'
import { FaSignOutAlt } from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'
import { FaBars } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
import '../custom-css.css'
import DeleteConfirmationUser from './DeleteConfirmationUser'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'

const Navigation = ({ showSort, sortDesc, sortAsc }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector(state => state.login.token)
  const [filter, setFilter] = useState('Filter by')

  const [show, setShow] = useState(false)
  
  const handleLogout = () => {
    dispatch(initSearchResults())
    dispatch(tryLogout())
    history.push('/')
  }

  const fetchBooks = (event) => {
    event.preventDefault()
    const searchWords = event.target.searchWords.value
    dispatch(startSearch())
    history.push('/search')
    dispatch(searchBooks(filter, searchWords))
    clearSearhBar()
  }

  const handleDelete = () => {
    dispatch(tryUserDeletion(token))
  }

  const clearSearhBar = () => {
    document.getElementById('search bar').reset()
  }

  const navDropDownIcon = (<FaCog size={35} />)
  const navBarsIcon = (<FaBars size={20} />)

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
        <Form className="mr-5" onSubmit={fetchBooks} inline id={'search bar'}>
          <InputGroup>
            <DropdownButton variant="secondary" title={filter} >
              <DropdownItem onClick={() => setFilter('Filter by')} >No filter</DropdownItem>
              <DropdownItem  onClick={() => setFilter('Title')} >Title</DropdownItem>
              <DropdownItem onClick={() => setFilter('Author') } >Author</DropdownItem>
            </DropdownButton>
            <Form.Control name="searchWords" type="text" placeholder="Search from Google Books"/>
            <Button type="submit">
              <FaSearch />
            </Button>
          </InputGroup>
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