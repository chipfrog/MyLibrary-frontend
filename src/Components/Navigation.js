import React, { useState, useEffect } from 'react'
import { Navbar, Nav, NavDropdown, Form, Button, Row, Col, Container, InputGroup, DropdownButton } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { tryLogout, tryUserDeletion } from '../Reducers/userReducer'
import { searchBooks, startSearch, initSearchResults } from '../Reducers/bookSearchReducer'
import { FaCog } from 'react-icons/fa'
import { FaSignOutAlt } from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
import '../custom-css.css'
import DeleteConfirmationUser from './DeleteConfirmationUser'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'

const Navigation = ({ showSort, sortDesc, sortAsc, filterBooks }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector(state => state.login.token)
  const username = useSelector(state => state.login.username)
  const [filter, setFilter] = useState('Filter by')
  const [show, setShow] = useState(false)
  const [owned, setOwned] = useState(false)
  const [read, setRead] = useState(false)
  const [notOwned, setNotOwned] = useState(false)
  const [unread, setUnread] = useState(false)

  useEffect(() => {
    if (filterBooks) {
      handleFilter()
    }
  }, [owned, read, notOwned, unread])
  
  const handleLogout = () => {
    dispatch(initSearchResults())
    dispatch(tryLogout())
    history.push('/')
  }

  const fetchBooks = (event) => {
    event.preventDefault()
    const keyWords = event.target.keyWords.value
    dispatch(startSearch())
    history.push('/search')
    dispatch(searchBooks(filter, keyWords))
    clearSearhBar()
  }

  const handleDelete = () => {
    dispatch(tryUserDeletion(token))
  }

  const handleFilter = () => {
    filterBooks(owned, read, notOwned, unread)
  }

  const clearSearhBar = () => {
    document.getElementById('search bar').reset()
  }

  const navDropDownIcon = (<FaCog size={25} />)

  return (
    <>
    <Navbar className="navigation" fixed="top" bg="dark" variant="dark" >
      <Navbar.Brand as={Link} to={"/"}>My Library</Navbar.Brand>
      <Nav className="mr-auto">
        {showSort &&
          <> 
          <NavDropdown className="ml-auto" title="Sort by" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => sortDesc('rating')} >Rating: Highest-Lowest</NavDropdown.Item>
            <NavDropdown.Item onClick={() => sortAsc('rating')}>Rating: Lowest-Highest</NavDropdown.Item>
            <NavDropdown.Item onClick={() => sortAsc('title')}>Title: A-Z</NavDropdown.Item>
            <NavDropdown.Item onClick={() => sortDesc('title')}>Title: Z-A</NavDropdown.Item>
            <NavDropdown.Item onClick={() => sortAsc('author')}>Author: A-Z</NavDropdown.Item>
            <NavDropdown.Item onClick={() => sortDesc('author')}>Author: Z-A</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Filter by" >
            <Form className="px-4 py-3" > 
              <Form.Check
                id="owned"
                inline
                type="checkbox"
                label="Owned"
                onChange={() => setOwned(!owned)}
                disabled={notOwned}
              />
              <Form.Check 
                id="not-owned"
                inline
                type="checkbox"
                label="Not owned"
                onChange={() => setNotOwned(!notOwned)}
                disabled={owned}
              />
              <Form.Check 
                id="read"
                inline
                type="checkbox"
                label="Read"
                onChange={() => setRead(!read)}
                disabled={unread}
              />
              <Form.Check 
                id="unread"
                inline
                type="checkbox"
                label="Unread"
                onChange={() => setUnread(!unread)}
                disabled={read}
              />   
            </Form>
          </NavDropdown>
          </>
        }
        <Nav.Link as={Link} to={"/search"}>Book finder</Nav.Link>
      </Nav>
      <Nav className="ml-auto" xs={12} sm={6} >
        <Form className="mr-5" onSubmit={fetchBooks} inline id={'search bar'}>
          <InputGroup>
            <DropdownButton variant="secondary" title={filter} >
              <DropdownItem onClick={() => setFilter('Filter by')} >No filter</DropdownItem>
              <DropdownItem  onClick={() => setFilter('Title')} >Title</DropdownItem>
              <DropdownItem onClick={() => setFilter('Author') } >Author</DropdownItem>
            </DropdownButton>
            <Form.Control name="keyWords" type="text" placeholder="Search from Google Books"/>
            <Button type="submit">
              <FaSearch />
            </Button>
          </InputGroup>
        </Form>
        <Nav.Link disabled className="text-white" inline >{username}</Nav.Link>
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