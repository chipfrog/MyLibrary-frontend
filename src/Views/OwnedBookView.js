import { React, useState } from 'react'
import { Container, Jumbotron, Row, Col, Button, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import StarRating from '../Components/StarRating'
import BookReviewForm from '../Components/BookReviewForm'
import { deleteBookFromLibrary } from '../Reducers/userReducer'

const OwnedBookView = () => {
  const book = useSelector(state => state.ownedBook.bookInfo)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const dispatch = useDispatch()
  const token = useSelector(state => state.login.token)

  const handleBookDelete = async () => {
    dispatch(deleteBookFromLibrary(book.id, token))
  }

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
              <Row>
                <Button onClick={handleBookDelete} variant='danger'>Delete</Button>
              </Row>
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
        <Row className="pt-3" >
          <Col>
            <h4>Quotes</h4>
          </Col>
        </Row>
        {book.quotes.map((quote) => {
          return (
            <Row className="pt-3">
              <Col>
                <Card>
                  <Card.Header>
                    <Button className="close"></Button>
                  </Card.Header>
                  <Card.Body>
                    {quote}
                  </Card.Body>
                  <Card.Footer>
                    <Row>
                      <Button>Edit</Button>
                      <Button className="ml-1" variant="danger">Delete</Button>
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          )
        })}
      </Container>
    </div>    
  )
}

export default OwnedBookView