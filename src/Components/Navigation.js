import React from 'react'
import { Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { tryLogout } from '../Reducers/userReducer'
import { searchBooks, startSearch, initSearchResults } from '../Reducers/bookSearchReducer'
import '../custom-css.css'

const Navigation = ({ showSort, sortDesc, sortAsc }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  
  const handleLogout = () => {
    dispatch(initSearchResults())
    dispatch(tryLogout())
  }

  const fetchBooks = (event) => {
    event.preventDefault()
    const filter = event.target.filter.value
    dispatch(startSearch())
    history.push('/search')
    dispatch(searchBooks(filter))
    clearSearhBar()
  }

  const clearSearhBar = () => {
    document.getElementById('search bar').reset()
  }

  return (
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
        <Form onSubmit={fetchBooks} inline id={'search bar'}>
          <Form.Control name="filter" type="text" placeholder="Search from Google Books" className="mr-2" />
          <Button type="submit">Search</Button>
        </Form>
        <Nav.Link className="pl-5" as={Link} to={"/"} onClick={handleLogout}>Logout</Nav.Link>
      </Nav>
    </Navbar>  
  )
}

export default Navigation