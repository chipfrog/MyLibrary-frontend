import { React, useState } from 'react'
import { Container, Jumbotron, Row, Col, Button, Tabs, Tab, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import StarRating from '../Components/StarRating'
import { deleteBookFromLibrary, tryBookUpdate } from '../Reducers/userReducer'
import { setOwnedBookInfo } from '../Reducers/ownedBookReducer'
import Review from '../Components/Review'

const OwnedBookView = () => {
  const book = useSelector(state => state.ownedBook.bookInfo)
 
  return (
    <>
    <Jumbotron fluid>
      <Container>
          <Row>
            <Col xs={8}>
              <h1>{book.title}</h1>
              <h5><i>{book.author}</i></h5>
              <StarRating book={book} />
            </Col>
            <Col xs={4} >
              <img src={book.linkToCoverImage} alt="cover"/>
            </Col>
          </Row>
      </Container>
    </Jumbotron>
    <Container>
      <Review book={book}/>
    </Container>
    </>
  )
}

export default OwnedBookView