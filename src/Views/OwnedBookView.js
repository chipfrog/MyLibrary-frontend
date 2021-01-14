import { React, useState } from 'react'
import { Container, Jumbotron, Row, Col, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import StarRating from '../Components/StarRating'
import BookReviewForm from '../Components/BookReviewForm'

const OwnedBookView = () => {
  const book = useSelector(state => state.ownedBook.bookInfo)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div>
      <Jumbotron fluid>
        <Container className="text-left">
          <Row>
            <Col xs={8} >
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
        <Row>
          <Col> 
            <h4>Review</h4>
          </Col>
        </Row>
        <Row className="text-justify">
          <Col>
            <p>{book.review}</p>
            <Button onClick={handleShow} >Edit</Button>
          </Col>
        </Row>
        <BookReviewForm bookInfo={book} handleClose={handleClose} show={show} />
      </Container>
    </div>    
  )
}

export default OwnedBookView