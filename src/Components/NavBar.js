import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { tryLogout } from '../Reducers/loginReducer'
import { initSearchResults } from '../Reducers/bookSearchReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  
  const handleLogout = () => {
    dispatch(initSearchResults())
    dispatch(tryLogout())
  }

  return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to={"/"}>My Library</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={"/search"}>Book finder</Nav.Link>
          <Nav.Link as={Link} to={"/user"} >User</Nav.Link>
          <Nav.Link as={Link} to={"/"} onClick={handleLogout} >Logout</Nav.Link>
       </Nav>
      </Navbar>
    
  )
}

export default Navigation