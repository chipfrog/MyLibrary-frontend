import React from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { searchBooks } from '../Reducers/bookSearchReducer'

const Searchbar = () => { 
  const dispatch = useDispatch()
  
  const fetchBooks = async (event) => {
    event.preventDefault()
    const filter = event.target.filter.value
    dispatch(searchBooks(filter))
    clearSearhBar()
  }

  const clearSearhBar = () => {
    document.getElementById('search bar').reset()
  }
 
  return (
    <Form className="mt-5 mb-5" id={'search bar'} onSubmit={fetchBooks}>
      <Row>
        <Col xs={{ span: 5, offset: 3 }} sm={{ span: 6, offset: 3 }} md={{ span: 6, offset: 2 }} lg={{ span: 6, offset: 2 }}>
          <Form.Control 
            type="text"
            name="filter" 
            placeholder="Search books"
          />
        </Col>
        <Col xs={1} >
          <Button variant="primary" type="submit">
            <BsSearch />
          </Button>
        </Col>
      </Row>
    </Form>    
  )
}

export default Searchbar
