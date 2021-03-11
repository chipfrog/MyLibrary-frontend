import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { tryLogout } from '../Reducers/userReducer'
import { initSearchResults } from '../Reducers/bookSearchReducer'

const Navigation = ({ showSort, sortDesc, sortAsc }) => {
  const dispatch = useDispatch()
  
  const handleLogout = () => {
    dispatch(initSearchResults())
    dispatch(tryLogout())
  }

  return (
    <Navbar bg="dark" variant="dark">
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
        <Nav.Link as={Link} to={"/"} onClick={handleLogout} >Logout</Nav.Link>
      </Nav>
    </Navbar>  
  )
}

export default Navigation