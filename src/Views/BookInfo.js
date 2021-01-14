import { React, useState } from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import BookReviewForm from '../Components/BookReviewForm'

const BookInfo = () => {
  const info = useSelector(state => state.bookInfo)
  const bookInfo = info.bookInfo

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  
  if (bookInfo === null) {
    return (
      <h2>undefined</h2>
    )
  }

  // Korjaa näkymä, kun kirjalijoita enemmän kuin yksi!

  return (
    <Container className="pt-4 text-center">
      <h2>{bookInfo.volumeInfo.title}</h2>
      <h3>{bookInfo.volumeInfo.subtitle}</h3>
      <h5><i>{bookInfo.volumeInfo.authors}</i></h5>
      <Row className="pt-4">
        <Col md={6}>
          <Image src={bookInfo.volumeInfo.imageLinks.thumbnail} />
        </Col>
        <Col className="text-justify">
          {bookInfo.volumeInfo.description}
        </Col>
      </Row>
      <Row className="pt-4">
        <Col>
          <Button onClick={handleShow}>Add book</Button>
        </Col>
        <Col>
        </Col>
      </Row>
      <BookReviewForm bookInfo={bookInfo} handleClose={handleClose} show={show} />      
    </Container>  
  )
}

export default BookInfo